import { Test, TestingModule } from '@nestjs/testing';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import { Repository } from 'typeorm';

describe('ShiftController', () => {
    let controller: ShiftController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ShiftController],
            providers: [
                ShiftService,
                {
                    provide: 'ShiftRepository',
                    useClass: Repository,
                },
            ],
        }).compile();

        controller = module.get<ShiftController>(ShiftController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
