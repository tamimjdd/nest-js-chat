import { User } from '../user/user.entity';
import { FilterConversation } from './dto/filter-conversation.dto';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.entity';
export declare class ChatController {
    private conversationService;
    constructor(conversationService: ConversationService);
    sendMessage(user: User, receiverId: number, message: string): Promise<Conversation>;
    getMessages(user: User, receiverId: number, filter: FilterConversation): Promise<Conversation[]>;
    getMyMessages(user: User, filter: FilterConversation): Promise<Conversation[]>;
    markAsRead(conversation: Conversation): Promise<any>;
    delete(conversationId: number, receiverId: number, user: User): Promise<Conversation>;
}
