import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ShiftService {
    constructor(
        @InjectRepository(Shift) private readonly repository: Repository<Shift>,
    ) {}

    async create(createShiftDto: CreateShiftDto): Promise<Shift> {
        /* if (createShiftDto.checkinTime) {
            const voucherDto: CreateVoucherDto = {
                volunteerID: createShiftDto.volunteerID,
            }; */

        return this.repository.save(createShiftDto);
    }

    async createMany(createShiftDtos: CreateShiftDto[]): Promise<Shift[]> {
        return this.repository.save(createShiftDtos);
    }

    async findAll(): Promise<Shift[]> {
        return this.repository.find();
    }

    async findOne(id: number): Promise<Shift> {
        return this.repository.findOneBy({ id });
    }

    async update(id: number, updateShiftDto: UpdateShiftDto): Promise<Shift> {
        const shift: Shift = await this.repository.findOneBy({ id });

        if (!shift) {
            throw new NotFoundException(`Shift with ID:${id} not found`);
        }

        return this.repository.save({ ...shift, ...updateShiftDto });
    }

    async remove(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}
