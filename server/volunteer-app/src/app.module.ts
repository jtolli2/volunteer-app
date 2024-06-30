import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VolunteerModule } from './volunteer/volunteer.module';
import { VoucherModule } from './voucher/voucher.module';
import { ShiftModule } from './shift/shift.module';
import { VoucherService } from './voucher/voucher.service';
import { VolunteerService } from './volunteer/volunteer.service';
import { ShiftService } from './shift/shift.service';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfigProd from './config/orm.config.prod';
import { Volunteer } from './volunteer/entities/volunteer.entity';
import { Voucher } from './voucher/entities/voucher.entity';
import { Shift } from './shift/entities/shift.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ormConfig],
            expandVariables: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory:
                process.env.NODE_ENV !== 'production'
                    ? ormConfig
                    : ormConfigProd,
        }),
        VolunteerModule,
        VoucherModule,
        ShiftModule,
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
