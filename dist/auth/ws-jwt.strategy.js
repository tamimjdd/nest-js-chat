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
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const jwt_config_1 = require("../config/jwt.config");
let WsJwtStrategy = class WsJwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy, 'ws-jwt') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromUrlQueryParameter('token'),
            ignoreExpiration: false,
            secretOrKey: jwt_config_1.jwtConstants.secret,
        });
    }
    async validate(payload) {
        console.log(payload);
        return { userId: payload.sub, username: payload.username };
    }
};
WsJwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], WsJwtStrategy);
exports.WsJwtStrategy = WsJwtStrategy;
//# sourceMappingURL=ws-jwt.strategy.js.map