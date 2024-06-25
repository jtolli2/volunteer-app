import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
        TypeOrmModule.forFeature([Voucher]),
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: +process.env.EMAIL_PORT,
                    secure: false,
                    auth: {
                        // type: 'OAuth2',
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                        // clientId: process.env.EMAIL_CLIENT_ID,
                        // clientSecret: process.env.EMAIL_CLIENT_SECRET,
                    },
                },
            }),
        }),
    ],
    controllers: [VoucherController],
    providers: [VoucherService],
})
export class VoucherModule {}
