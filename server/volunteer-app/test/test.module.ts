import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volunteer } from '../src/volunteer/entities/volunteer.entity';
import { Voucher } from '../src/voucher/entities/voucher.entity';
import { Shift } from '../src/shift/entities/shift.entity';
import { VolunteerModule } from '../src/volunteer/volunteer.module';
import { VoucherModule } from '../src/voucher/voucher.module';
import { ShiftModule } from '../src/shift/shift.module';
import { VolunteerService } from '../src/volunteer/volunteer.service';
import { VoucherService } from '../src/voucher/voucher.service';
import { ShiftService } from '../src/shift/shift.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
        }),
        TypeOrmModule.forRoot({
            type: 'better-sqlite3',
            // database: ':memory:',
            database: 'test.db',
            autoLoadEntities: true,
            synchronize: true,
            dropSchema: true,
        }),
        TypeOrmModule.forFeature([Volunteer, Voucher, Shift]),
        VolunteerModule,
        VoucherModule,
        ShiftModule,
    ],
    providers: [VolunteerService, VoucherService, ShiftService],
})
export class TestModule {}
