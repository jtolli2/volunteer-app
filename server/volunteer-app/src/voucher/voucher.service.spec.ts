import { Test, TestingModule } from '@nestjs/testing';
import { VoucherService } from './voucher.service';
import { Voucher } from './entities/voucher.entity';
import { Shift } from '../shift/entities/shift.entity';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { Volunteer } from '../volunteer/entities/volunteer.entity';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

describe('VoucherService', () => {
    let service: VoucherService;
    let module: TestingModule;
    let testVolunteer: Volunteer;

    beforeAll(async () => {
        testVolunteer = {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'jdoe@me.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            shifts: Promise.resolve([]),
            vouchers: Promise.resolve([]),
        };
    });

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    expandVariables: true,
                }),
                TypeOrmModule.forRoot({
                    type: 'better-sqlite3',
                    database: ':memory:',
                    autoLoadEntities: true,
                    synchronize: true,
                    dropSchema: true,
                }),
                TypeOrmModule.forFeature([Voucher, Volunteer, Shift]),
                MailerModule.forRootAsync({
                    useFactory: () => ({
                        transport: {
                            host: process.env.EMAIL_HOST,
                            port: +process.env.EMAIL_PORT,
                            secure: true,
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
            providers: [VoucherService],
        }).compile();

        service = module.get<VoucherService>(VoucherService);
    });

    afterEach(async () => {
        const dataSource = module.get(getDataSourceToken());
        await dataSource.destroy();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new voucher', async () => {
        const voucherDto: CreateVoucherDto = {
            volunteer: testVolunteer,
        };

        const voucher = await service.create(voucherDto);
        expect(voucher.volunteer).toEqual(testVolunteer);
        expect(voucher.drinksRemaining).toEqual(2);
        expect(voucher.mealsRemaining).toEqual(2);
        expect(voucher.snacksRemaining).toEqual(2);
        expect(voucher.code).toBeTruthy();
        expect(voucher.id).toBeTruthy();
    });

    it('should update a voucher', async () => {
        const voucherDto: CreateVoucherDto = {
            volunteer: testVolunteer,
        };
        const voucher = await service.create(voucherDto);
        const updateVoucherDto: UpdateVoucherDto = {
            drinksRemaining: 5,
            mealsRemaining: 4,
            snacksRemaining: 4,
        };
        const updatedVoucher = await service.update(
            voucher.id,
            updateVoucherDto,
        );
        expect(updatedVoucher.drinksRemaining).toEqual(5);
        expect(updatedVoucher.mealsRemaining).toEqual(4);
        expect(updatedVoucher.snacksRemaining).toEqual(4);
    });

    it('should delete a voucher', async () => {
        const voucherDto: CreateVoucherDto = {
            volunteer: testVolunteer,
        };
        const voucher = await service.create(voucherDto);
        await service.remove(voucher.id);
        expect(await service.findOne(voucher.id)).toBeNull();
    });

    it('should get all vouchers', async () => {
        const voucherDto: CreateVoucherDto = {
            volunteer: testVolunteer,
        };
        await service.create(voucherDto);
        expect(await service.findAll()).toHaveLength(1);
    });

    it('should find a voucher', async () => {
        const voucherDto: CreateVoucherDto = {
            volunteer: testVolunteer,
        };
        const voucher = await service.create(voucherDto);
        const result = await service.findOne(voucher.id);
        expect(result.id).toEqual(voucher.id);
        expect(result.drinksRemaining).toEqual(voucher.drinksRemaining);
        expect(result.mealsRemaining).toEqual(voucher.mealsRemaining);
        expect(result.snacksRemaining).toEqual(voucher.snacksRemaining);
        expect(result.code).toEqual(voucher.code);
    });
});
