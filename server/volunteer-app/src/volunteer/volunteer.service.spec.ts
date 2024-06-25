import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerService } from './volunteer.service';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { Volunteer } from './entities/volunteer.entity';
import { Shift } from '../shift/entities/shift.entity';
import { Voucher } from '../voucher/entities/voucher.entity';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';

describe('VolunteerService', () => {
    let service: VolunteerService;
    let module: TestingModule;

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
                TypeOrmModule.forFeature([Volunteer, Shift, Voucher]),
            ],
            providers: [VolunteerService],
        }).compile();

        service = module.get<VolunteerService>(VolunteerService);
    });

    afterEach(async () => {
        const dataSource = module.get(getDataSourceToken());
        await dataSource.destroy();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a volunteer', async () => {
        let testVolunteerDto = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'jdoe@me.com',
        };
        const volunteer = await service.create(testVolunteerDto);
        expect(await service.findOne(volunteer.id)).toEqual(testVolunteerDto);
    });

    it('should create many volunteers', async () => {
        let testVolunteerDtos: CreateVolunteerDto[] = [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'jdoe@me.com',
            },
            {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jdoe@me.com',
            },
        ];
        const volunteers = await service.createMany(testVolunteerDtos);
        expect(await service.findOne(volunteers[0].id)).toEqual(
            testVolunteerDtos[0],
        );
        expect(await service.findOne(volunteers[1].id)).toEqual(
            testVolunteerDtos[1],
        );
    });

    it('should update a volunteer', async () => {
        let testVolunteerDto = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'jdoe@me.com',
        };
        const volunteer = await service.create(testVolunteerDto);
        const updatedVolunteer = await service.update(volunteer.id, {
            firstName: 'Jane',
        });
        expect(await service.findOne(volunteer.id)).toEqual(updatedVolunteer);
    });

    it('should delete a volunteer', async () => {
        let testVolunteerDto = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'jdoe@me.com',
        };
        const volunteer = await service.create(testVolunteerDto);
        await service.remove(volunteer.id);
        expect(await service.findOne(volunteer.id)).toBeNull();
    });

    it('should find a volunteer', async () => {
        let testVolunteerDto = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'jdoe@me.com',
        };
        const volunteer = await service.create(testVolunteerDto);
        expect(await service.findOne(volunteer.id)).toEqual(testVolunteerDto);
    });

    it('should find all volunteers', async () => {
        let testVolunteerDtos: CreateVolunteerDto[] = [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'jdoe@me.com',
            },
            {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jdoe@me.com',
            },
            {
                firstName: 'John',
                lastName: 'Smith',
                email: 'jdoe@me.com',
            },
        ];

        await service.createMany(testVolunteerDtos);

        expect(await service.findAll()).toHaveLength(3);
    });
});
