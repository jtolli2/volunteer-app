import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('shift')
export class ShiftController {
    constructor(private readonly shiftService: ShiftService) {}

    @Post()
    create(@Body() createShiftDto: CreateShiftDto) {
        return this.shiftService.create(createShiftDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.shiftService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.shiftService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
        return this.shiftService.update(id, updateShiftDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.shiftService.remove(id);
    }
}
