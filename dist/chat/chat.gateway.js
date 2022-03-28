"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const ws_auth_guard_1 = require("../auth/ws-auth.guard");
const jwt_1 = require("@nestjs/jwt");
let ChatGateway = class ChatGateway {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('ChatGateway');
        this.onlineUsers = new Set();
    }
    handleConnection(socket, ...args) {
        const user = this.getUser(socket);
        if (!user) {
            socket.disconnect();
            this.logger.error('authentication failed ' + socket.id);
        }
        else {
            this.logger.warn('authentication success! ' + user.username);
            this.onlineUsers.add(user.userId);
            this.dispatchUsersOnline();
        }
    }
    handleDisconnect(socket) {
        const user = this.getUser(socket);
        this.onlineUsers.delete(user.userId);
        this.logger.warn('user disconnected ' + user.username);
        this.dispatchUsersOnline();
    }
    handleMessage(client, payload) {
        this.logger.log(payload);
        return payload;
    }
    dispatchUsersOnline() {
        this.logger.log(Array.from(this.onlineUsers));
        this.wss.emit('users/online', Array.from(this.onlineUsers));
    }
    getUser(socket) {
        const token = socket.handshake.query.token;
        const user = this.jwtService.decode(token);
        return user;
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "wss", void 0);
__decorate([
    common_1.UseGuards(ws_auth_guard_1.WsAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleConnection", null);
__decorate([
    websockets_1.SubscribeMessage('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], ChatGateway.prototype, "handleMessage", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: 'chat' }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map