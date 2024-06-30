import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        const match = user && (await bcrypt.compare(pass, user.password));
        if (match) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }

    refreshToken(user: User) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: User) {
        user.password = await this.encrypt(user.password);
        const { password, ...result } = await this.userService.create(user);
        return result;
    }

    async updateUser(user: User) {
        if (user.password) {
            user.password = await this.encrypt(user.password);
        }
        const { password, ...result } = await this.userService.update(
            user.username,
            user,
        );
        return result;
    }

    async encrypt(data: string): Promise<string> {
        return await bcrypt.hash(data, 10);
    }
}
