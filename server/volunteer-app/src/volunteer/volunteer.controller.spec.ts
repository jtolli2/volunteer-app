import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import { Repository } from 'typeorm';

describe('VolunteerController', () => {
    let controller: VolunteerController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VolunteerController],
            providers: [
                VolunteerService,
                {
                    provide: 'VolunteerRepository',
                    useClass: Repository,
                },
            ],
        }).compile();

        controller = module.get<VolunteerController>(VolunteerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
