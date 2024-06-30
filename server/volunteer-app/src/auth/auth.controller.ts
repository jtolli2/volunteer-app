import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RefreshJwtGuard } from './guard/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh-token')
    async refreshToken(@Request() req: any) {
        return this.authService.refreshToken(req.user);
    }

    @Post('encrypt')
    async encrypt(@Request() req: any) {
        return this.authService.encrypt(req.body.data);
    }

    @Post('register')
    async register(@Request() req: any) {
        return this.authService.register(req.body);
    }

    // TODO: confirm user being updated is the same user who is logged in
    // @UseGuards(RefreshJwtGuard)
    @Post('update-user')
    async updateUser(@Request() req: any) {
        return this.authService.updateUser(req.body);
    }
}
