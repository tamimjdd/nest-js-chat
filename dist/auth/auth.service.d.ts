import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signup(createUserDTO: CreateUserDTO): Promise<User>;
    signin(username: string, password: string): Promise<{
        accessToken: string;
        data: string | {
            [key: string]: any;
        };
    }>;
    private hashPassword;
    decodeToken(accessToken: string): string | {
        [key: string]: any;
    };
}
