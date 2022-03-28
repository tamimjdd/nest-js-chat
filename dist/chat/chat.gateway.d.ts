import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    logger: Logger;
    onlineUsers: Set<any>;
    user: any;
    wss: Server;
    constructor(jwtService: JwtService);
    handleConnection(socket: Socket, ...args: any[]): void;
    handleDisconnect(socket: Socket): void;
    handleMessage(client: any, payload: any): string;
    private dispatchUsersOnline;
    private getUser;
}
