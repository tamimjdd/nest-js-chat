import { Strategy } from 'passport-jwt';
declare const WsJwtStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class WsJwtStrategy extends WsJwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        username: any;
    }>;
}
export {};
