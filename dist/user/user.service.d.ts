import { UserRepository } from './user.repository';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    findUserbyEmail(email: string): Promise<User>;
    saveUser(user: User): Promise<User>;
    findByUsernameOrEmail(username: string): Promise<User>;
    getUsers(): Promise<User[]>;
}
