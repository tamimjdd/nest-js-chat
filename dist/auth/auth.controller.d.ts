import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(createUserDTO: CreateUserDTO): Promise<import("../user/user.entity").User>;
    signin(username: string, password: string): Promise<{
        accessToken: string;
        data: string | {
            [key: string]: any;
        };
    }>;
}
