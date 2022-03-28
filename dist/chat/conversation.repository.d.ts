import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { FilterConversation } from './dto/filter-conversation.dto';
import { User } from '../user/user.entity';
export declare class ConversationRepository extends Repository<Conversation> {
    getConversation(senderId: number, receiverId: number, filter: FilterConversation): Promise<Conversation[]>;
    saveConversation(createConversationDTO: CreateConversationDTO): Promise<Conversation>;
    markAllBeforeAsRead(conversation: Conversation): Promise<any>;
    deleteConversation(conversationId: number, user: User): Promise<Conversation>;
}
