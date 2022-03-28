import { ConversationRepository } from './conversation.repository';
import { FilterConversation } from './dto/filter-conversation.dto';
import { Conversation } from './conversation.entity';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { User } from '../user/user.entity';
import { ChatGateway } from './chat.gateway';
export declare class ConversationService {
    private conversationRepo;
    private chatGateway;
    constructor(conversationRepo: ConversationRepository, chatGateway: ChatGateway);
    getConversation(senderId: number, receiverId: number, filter: FilterConversation): Promise<Conversation[]>;
    saveConversation(createConversationDTO: CreateConversationDTO): Promise<Conversation>;
    markAllBeforeAsRead(conversation: Conversation): Promise<any>;
    deleteConversation(conversationId: number, user: User): Promise<Conversation>;
}
