import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.repository.save(createUserDto);
    }

    async findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async findOne(username: string): Promise<User> {
        return this.repository.findOneBy({ username });
    }

    async update(
        username: string,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        const user = await this.repository.findOneBy({ username });

        if (!user) {
            throw new NotFoundException(`User with ID:${username} not found`);
        }

        return this.repository.save({ ...user, ...updateUserDto });
    }

    async remove(username: string): Promise<DeleteResult> {
        return this.repository.delete(username);
    }
}
