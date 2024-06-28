import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { VolunteerService } from '../src/volunteer/volunteer.service';
import { VoucherService } from '../src/voucher/voucher.service';
import { ShiftService } from '../src/shift/shift.service';
import { CreateVolunteerDto } from '../src/volunteer/dto/create-volunteer.dto';
import { Volunteer } from '../src/volunteer/entities/volunteer.entity';
import { Voucher } from '../src/voucher/entities/voucher.entity';
import { Shift } from '../src/shift/entities/shift.entity';
import { AppController } from '../src/app.controller';
import { VolunteerController } from '../src/volunteer/volunteer.controller';
import { VoucherController } from '../src/voucher/voucher.controller';
import { ShiftController } from '../src/shift/shift.controller';
import { AppService } from '../src/app.service';
import { Day, Time } from '../src/shared/enums';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let moduleFixture: TestingModule;
    let volunteerService: VolunteerService;
    let voucherService: VoucherService;
    let shiftService: ShiftService;
    let testVolunteer: Volunteer;

    beforeAll(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [
                // AppModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                    expandVariables: true,
                }),
                TypeOrmModule.forRoot({
                    type: 'better-sqlite3',
                    database: ':memory:',
                    // database: 'test.db',
                    autoLoadEntities: true,
                    synchronize: true,
                    dropSchema: true,
                }),
                TypeOrmModule.forFeature([Volunteer, Voucher, Shift]),
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
            controllers: [
                AppController,
                VolunteerController,
                VoucherController,
                ShiftController,
            ],
            providers: [
                AppService,
                VolunteerService,
                VoucherService,
                ShiftService,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        volunteerService = moduleFixture.get(VolunteerService);
        voucherService = moduleFixture.get(VoucherService);
        shiftService = moduleFixture.get(ShiftService);
    });

    afterAll(async () => {
        await app.close();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });

    it('should create a volunteer', async () => {
        const createVolunteerDto: CreateVolunteerDto = {
            firstName: 'Test',
            lastName: 'User',
            email: 'J8k6N@example.com',
        };

        testVolunteer = await volunteerService.create(createVolunteerDto);
        expect(testVolunteer.firstName).toEqual('Test');
        expect(testVolunteer.lastName).toEqual('User');
        expect(testVolunteer.email).toEqual('J8k6N@example.com');
    });

    it('should create a shift for a volunteer', async () => {
        const shift = await shiftService.create({
            day: Day.SUN,
            time: Time.AM,
            volunteer: testVolunteer,
        });

        const result = await shiftService.findOne(shift.id);
        const resultVolunteerShifts = await result.volunteer.shifts;
        expect(result.volunteer.id).toEqual(shift.volunteer.id);
        expect(resultVolunteerShifts[0].id).toEqual(shift.id);
    });

    it('should create a voucher for a volunteer', async () => {
        const voucher = await voucherService.create({
            volunteer: testVolunteer,
        });

        const result = await voucherService.findOne(voucher.id);
        expect(result.id).toEqual(voucher.id);
        expect(voucher.volunteer.id).toEqual(testVolunteer.id);
    });

    it('should find voucher by volunteer', async () => {
        const voucher = await voucherService.findOneByVolunteer(testVolunteer);
        expect(voucher.volunteer.id).toEqual(testVolunteer.id);
    });

    it('should update a voucher for a volunteer', async () => {
        const voucher = await voucherService.create({
            volunteer: testVolunteer,
        });
        expect(voucher.volunteer.id).toEqual(testVolunteer.id);
        expect(voucher.drinksRemaining).toEqual(4);
        expect(voucher.mealsRemaining).toEqual(4);
        expect(voucher.snacksRemaining).toEqual(4);
    });
});
