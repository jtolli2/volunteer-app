import { Test, TestingModule } from '@nestjs/testing';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { Volunteer } from '../volunteer/entities/volunteer.entity';
import { Shift } from '../shift/entities/shift.entity';
import { TestModule } from '../../test/test.module';

describe('VoucherController', () => {
    let controller: VoucherController;
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [TestModule],
        }).compile();

        controller = module.get<VoucherController>(VoucherController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
