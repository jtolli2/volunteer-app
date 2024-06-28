import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { Volunteer } from './entities/volunteer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class VolunteerService {
    constructor(
        @InjectRepository(Volunteer)
        private readonly repository: Repository<Volunteer>,
    ) {}

    async create(createVolunteerDto: CreateVolunteerDto): Promise<Volunteer> {
        return this.repository.save(createVolunteerDto);
    }

    createMany(testVolunteerDtos: CreateVolunteerDto[]): Promise<Volunteer[]> {
        return this.repository.save(testVolunteerDtos);
    }

    async findAll(): Promise<Volunteer[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<Volunteer> {
        return this.repository.findOneBy({ id });
    }

    async update(
        id: string,
        updateVolunteerDto: UpdateVolunteerDto,
    ): Promise<Volunteer> {
        const volunteer: Volunteer = await this.repository.findOneBy({ id });
        if (!volunteer) {
            throw new NotFoundException(`Volunteer with ID:${id} not found`);
        }

        return this.repository.save({ ...volunteer, ...updateVolunteerDto });
    }

    async remove(id: string): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

    async getDetails(id: string): Promise<Volunteer> {
        let volunteer: Volunteer = await this.repository.findOneBy({ id });

        if (!volunteer) {
            throw new NotFoundException(`Volunteer with ID:${id} not found`);
        }

        await volunteer.shifts;
        await volunteer.vouchers;

        console.log(volunteer);

        return volunteer;
    }
}
