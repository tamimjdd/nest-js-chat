export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    salt: string;
    validatePassword(password: string): Promise<boolean>;
    constructor(partial?: Partial<User>);
}
