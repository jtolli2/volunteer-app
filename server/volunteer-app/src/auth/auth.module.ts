import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { RefreshJwtStrategy } from './strategy/refresh-jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '5m' },
            }),
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
