import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerService } from '../src/volunteer/volunteer.service';
import { VoucherService } from '../src/voucher/voucher.service';
import { ShiftService } from '../src/shift/shift.service';
import { Volunteer } from '../src/volunteer/entities/volunteer.entity';
import { AppModule } from '../src/app.module';
import { Day, Time } from '../src/shared/enums';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let moduleFixture: TestingModule;
    let volunteerService: VolunteerService;
    let voucherService: VoucherService;
    let shiftService: ShiftService;
    let testVolunteer: Volunteer;

    beforeAll(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
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

    it('should create 10 shifts', async () => {
        testVolunteer = await volunteerService.findOne(
            '9e4b916c-34bc-48fc-a737-07b809e72c87',
        );

        console.log(testVolunteer);

        // Create 10 shifts
        for (let i = 0; i < 10; i++) {
            await shiftService.create({
                day: i % 2 === 0 ? Day.SUN : Day.SAT,
                time: i % 3 === 0 ? Time.AM : Time.PM,
                volunteer: testVolunteer,
            });
        }

        expect(await shiftService.findAll()).toHaveLength(10);
    });
});
