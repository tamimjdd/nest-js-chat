"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const conversation_entity_1 = require("./conversation.entity");
const common_1 = require("@nestjs/common");
let ConversationRepository = class ConversationRepository extends typeorm_1.Repository {
    async getConversation(senderId, receiverId, filter) {
        const query = this.createQueryBuilder('conversations');
        if (receiverId !== null) {
            query
                .andWhere('(senderId=:senderId and receiverId=:receiverId)', {
                senderId,
                receiverId,
            })
                .orWhere('(senderId=:receiverId and receiverId=:senderId)', {
                receiverId,
                senderId,
            });
        }
        else {
            query.andWhere('senderId=:senderId or receiverId=:senderId', {
                senderId,
            });
        }
        if (filter.after) {
            query.andWhere('createdAt > :after', { after: filter.after });
        }
        if (filter.before) {
            query.andWhere('createdAt < :after', { before: filter.before });
        }
        if (filter.page) {
            if (filter.limit) {
                query.skip(filter.limit * (filter.page - 1));
            }
            else {
                query.skip(15 * (filter.page - 1));
            }
        }
        if (filter.limit) {
            query.limit(filter.limit);
        }
        return query.orderBy('createdAt', 'ASC').getMany();
    }
    async saveConversation(createConversationDTO) {
        const { senderId, receiverId, message } = createConversationDTO;
        const conversation = new conversation_entity_1.Conversation();
        conversation.senderId = senderId;
        conversation.receiverId = receiverId;
        conversation.content = message;
        return this.save(conversation);
    }
    async markAllBeforeAsRead(conversation) {
        const q = this.createQueryBuilder('conversations')
            .update({ readAt: new Date().toISOString() })
            .andWhere('(senderId=:senderId and receiverId=:receiverId)', {
            senderId: conversation.senderId,
            receiverId: conversation.receiverId,
        })
            .orWhere('(senderId=:receiverId and receiverId=:senderId)', {
            receiverId: conversation.receiverId,
            senderId: conversation.senderId,
        })
            .andWhere('readAt IS NULL');
        const result = await q.execute();
        return result.raw.changedRows;
    }
    async deleteConversation(conversationId, user) {
        const query = this.createQueryBuilder('conversations');
        const c = await query
            .andWhere('id=:id', {
            id: conversationId,
        })
            .getOne();
        if (c.senderId !== user.id && c.receiverId !== user.id) {
            throw new common_1.UnauthorizedException('You are not able to delete this conversation');
        }
        return await this.remove(c);
    }
};
ConversationRepository = __decorate([
    typeorm_1.EntityRepository(conversation_entity_1.Conversation)
], ConversationRepository);
exports.ConversationRepository = ConversationRepository;
//# sourceMappingURL=conversation.repository.js.map