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
const conversation_repository_1 = require("./conversation.repository");
const typeorm_1 = require("@nestjs/typeorm");
const chat_gateway_1 = require("./chat.gateway");
const chat_config_1 = require("../config/chat.config");
common_1.Injectable();
let ConversationService = class ConversationService {
    constructor(conversationRepo, chatGateway) {
        this.conversationRepo = conversationRepo;
        this.chatGateway = chatGateway;
    }
    async getConversation(senderId, receiverId, filter) {
        return this.conversationRepo.getConversation(senderId, receiverId, filter);
    }
    async saveConversation(createConversationDTO) {
        const result = await this.conversationRepo.saveConversation(createConversationDTO);
        this.chatGateway.wss.emit(chat_config_1.chatGatewayConst.newMessageToUserChannel + result.receiverId, result);
        return result;
    }
    async markAllBeforeAsRead(conversation) {
        return this.conversationRepo.markAllBeforeAsRead(conversation);
    }
    async deleteConversation(conversationId, user) {
        return this.conversationRepo.deleteConversation(conversationId, user);
    }
};
ConversationService = __decorate([
    __param(0, typeorm_1.InjectRepository(conversation_repository_1.ConversationRepository)),
    __metadata("design:paramtypes", [conversation_repository_1.ConversationRepository,
        chat_gateway_1.ChatGateway])
], ConversationService);
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation.service.js.map