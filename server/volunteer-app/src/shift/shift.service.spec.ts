import { Test, TestingModule } from '@nestjs/testing';
import { ShiftService } from './shift.service';
import { Shift } from './entities/shift.entity';
import { Repository } from 'typeorm';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Day, Time } from '../shared/enums';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { Volunteer } from '../volunteer/entities/volunteer.entity';
import { Voucher } from '../voucher/entities/voucher.entity';

describe('ShiftService', () => {
    let service: ShiftService;
    let module: TestingModule;
    let testVolunteer: Volunteer;

    beforeAll(async () => {
        testVolunteer = {
            id: 1,
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
                TypeOrmModule.forRoot({
                    type: 'better-sqlite3',
                    database: ':memory:',
                    autoLoadEntities: true,
                    synchronize: true,
                    dropSchema: true,
                }),
                TypeOrmModule.forFeature([Shift, Volunteer, Voucher]),
            ],
            providers: [ShiftService],
        }).compile();

        service = module.get<ShiftService>(ShiftService);
    });

    afterEach(async () => {
        const dataSource = module.get(getDataSourceToken());
        await dataSource.destroy();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a shift', async () => {
        let testShiftDto: CreateShiftDto = {
            day: Day.SUN,
            time: Time.AM,
            volunteer: testVolunteer,
        };
        const shift = await service.create(testShiftDto);
        expect(shift.day).toEqual(testShiftDto.day);
        expect(shift.time).toEqual(testShiftDto.time);
        expect(shift.volunteer).toEqual(testShiftDto.volunteer);
    });

    it('should create many shifts', async () => {
        let testShiftDtos: CreateShiftDto[] = [
            {
                day: Day.SUN,
                time: Time.AM,
                volunteer: testVolunteer,
            },
            {
                day: Day.SAT,
                time: Time.PM,
                volunteer: testVolunteer,
            },
        ];
        const shifts = await service.createMany(testShiftDtos);
        expect(shifts[0].day).toEqual(testShiftDtos[0].day);
        expect(shifts[0].time).toEqual(testShiftDtos[0].time);
        expect(shifts[0].volunteer).toEqual(testShiftDtos[0].volunteer);
        expect(shifts[1].day).toEqual(testShiftDtos[1].day);
        expect(shifts[1].time).toEqual(testShiftDtos[1].time);
        expect(shifts[1].volunteer).toEqual(testShiftDtos[1].volunteer);
    });

    it('should update a shift', async () => {
        let testShiftDto = {
            day: Day.SUN,
            time: Time.AM,
            volunteer: testVolunteer,
        };
        const shift = await service.create(testShiftDto);
        const updatedShift = await service.update(shift.id, {
            day: Day.SAT,
        });
        expect(updatedShift.day).toEqual(Day.SAT);
    });

    it('should delete a shift', async () => {
        let testShiftDto = {
            day: Day.SUN,
            time: Time.AM,
            volunteer: testVolunteer,
        };
        const shift = await service.create(testShiftDto);
        await service.remove(shift.id);
        expect(await service.findOne(shift.id)).toBeNull();
    });

    it('should find a shift', async () => {
        let testShiftDto = {
            day: Day.SUN,
            time: Time.AM,
            volunteer: testVolunteer,
        };
        const shift = await service.create(testShiftDto);
        const result = await service.findOne(shift.id);
        expect(result.id).toEqual(shift.id);
        expect(result.day).toEqual(shift.day);
        expect(result.time).toEqual(shift.time);
    });

    it('should find all shifts', async () => {
        let testShiftDtos: CreateShiftDto[] = [
            {
                day: Day.SUN,
                time: Time.AM,
                volunteer: testVolunteer,
            },
            {
                day: Day.SAT,
                time: Time.PM,
                volunteer: testVolunteer,
            },
        ];
        await service.createMany(testShiftDtos);
        expect(await service.findAll()).toHaveLength(2);
    });
});
