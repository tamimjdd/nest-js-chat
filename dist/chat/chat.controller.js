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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../user/user.entity");
const not_null_pipe_1 = require("../auth/pipes/not-null.pipe");
const filter_conversation_dto_1 = require("./dto/filter-conversation.dto");
const conversation_service_1 = require("./conversation.service");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const common_2 = require("@nestjs/common");
const conversation_entity_1 = require("./conversation.entity");
let ChatController = class ChatController {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    sendMessage(user, receiverId, message) {
        const createConversationDTO = new create_conversation_dto_1.CreateConversationDTO();
        createConversationDTO.senderId = user.id;
        createConversationDTO.receiverId = receiverId;
        createConversationDTO.message = message;
        return this.conversationService.saveConversation(createConversationDTO);
    }
    getMessages(user, receiverId, filter) {
        return this.conversationService.getConversation(user.id, receiverId, filter);
    }
    getMyMessages(user, filter) {
        return this.conversationService.getConversation(user.id, null, filter);
    }
    markAsRead(conversation) {
        return this.conversationService.markAllBeforeAsRead(conversation);
    }
    delete(conversationId, receiverId, user) {
        return this.conversationService.deleteConversation(conversationId, user);
    }
};
__decorate([
    common_1.Post(':receiverId/sendMessage'),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Param('receiverId', common_1.ParseIntPipe)),
    __param(2, common_1.Body('message', not_null_pipe_1.NotNullPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "sendMessage", null);
__decorate([
    common_2.Get(':receiverId/messages'),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Param('receiverId', common_1.ParseIntPipe)),
    __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, filter_conversation_dto_1.FilterConversation]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getMessages", null);
__decorate([
    common_2.Get('messages'),
    __param(0, get_user_decorator_1.GetUser()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, filter_conversation_dto_1.FilterConversation]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getMyMessages", null);
__decorate([
    common_1.Post(':receiverId/markAsRead'),
    __param(0, common_1.Body(common_2.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conversation_entity_1.Conversation]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "markAsRead", null);
__decorate([
    common_1.Delete(':receiverId/delete/:conversationId'),
    __param(0, common_1.Query(common_1.ParseIntPipe)),
    __param(1, common_1.Query(common_1.ParseIntPipe)),
    __param(2, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "delete", null);
ChatController = __decorate([
    common_1.Controller('chat'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map