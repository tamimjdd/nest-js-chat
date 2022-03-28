import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(user: User): Promise<User[]>;
}
