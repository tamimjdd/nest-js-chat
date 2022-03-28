"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const bcriptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signup(createUserDTO) {
        const { username, email, password } = createUserDTO;
        const exist = await this.userService.findUserbyEmail(email);
        if (exist) {
            throw new common_1.BadRequestException('email already taken');
        }
        const salt = await bcriptjs.genSalt();
        const user = new user_entity_1.User();
        user.email = email;
        user.password = await this.hashPassword(password, salt);
        user.username = username;
        user.salt = salt;
        await this.userService.saveUser(user);
        return user;
    }
    async signin(username, password) {
        const user = await this.userService.findByUsernameOrEmail(username);
        if (!user) {
            throw new common_1.UnauthorizedException('user not found');
        }
        if (!(await user.validatePassword(password))) {
            throw new common_1.UnauthorizedException('Authentication Failed');
        }
        const payload = {
            username: user.username,
            email: user.email,
            userId: user.id,
        };
        const accessToken = await this.jwtService.sign(payload);
        const decode = this.jwtService.decode(accessToken);
        return { accessToken, data: decode };
    }
    async hashPassword(password, salt) {
        return bcriptjs.hash(password, salt);
    }
    decodeToken(accessToken) {
        return this.jwtService.decode(accessToken);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map