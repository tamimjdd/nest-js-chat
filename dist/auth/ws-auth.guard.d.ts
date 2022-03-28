import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
declare const WsAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class WsAuthGuard extends WsAuthGuard_base implements CanActivate {
    logger: Logger;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    getRequest(context: ExecutionContext): any;
}
export {};
