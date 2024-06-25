import { PartialType } from '@nestjs/mapped-types';
import { CreateVoucherDto } from './create-voucher.dto';

export class UpdateVoucherDto extends PartialType(CreateVoucherDto) {
    drinksRemaining: number;
    mealsRemaining: number;
    snacksRemaining: number;
}
