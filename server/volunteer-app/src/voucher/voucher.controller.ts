import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

@Controller('voucher')
export class VoucherController {
    constructor(private readonly voucherService: VoucherService) {}

    @Post()
    create(@Body() createVoucherDto: CreateVoucherDto) {
        return this.voucherService.create(createVoucherDto);
    }

    @Get()
    findAll() {
        return this.voucherService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.voucherService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateVoucherDto: UpdateVoucherDto,
    ) {
        return this.voucherService.update(id, updateVoucherDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.voucherService.remove(id);
    }

    @Get(':id/send-email')
    async resendEmail(@Param('id') id: string) {
        const voucher = await this.voucherService.findOne(id);

        return await this.voucherService.sendEmail(voucher);
    }
}
