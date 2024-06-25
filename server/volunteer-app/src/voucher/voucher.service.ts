import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as QRCode from 'qrcode';
import { Volunteer } from '../volunteer/entities/volunteer.entity';
import * as NodeMailer from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class VoucherService {
    DEFAULT_VOUCHER_NUM: number = 2;

    constructor(
        @InjectRepository(Voucher)
        private readonly repository: Repository<Voucher>,
        private readonly mailerService: MailerService,
    ) {}

    async create(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
        let voucher: Voucher = await this.findOneByVolunteer(
            createVoucherDto.volunteer,
        );

        if (voucher) {
            return this.createForExistingVolunteer(voucher);
        }

        const newVoucher: Voucher = new Voucher();
        newVoucher.code = await this.generateQRCode(createVoucherDto);
        newVoucher.drinksRemaining = this.DEFAULT_VOUCHER_NUM;
        newVoucher.mealsRemaining = this.DEFAULT_VOUCHER_NUM;
        newVoucher.snacksRemaining = this.DEFAULT_VOUCHER_NUM;
        newVoucher.volunteer = createVoucherDto.volunteer;

        voucher = await this.repository.save(newVoucher);

        this.sendEmail(voucher);

        return voucher;
    }

    async createForExistingVolunteer(voucher: Voucher): Promise<Voucher> {
        const updateVoucherDto: UpdateVoucherDto = new UpdateVoucherDto();
        updateVoucherDto.drinksRemaining =
            voucher.drinksRemaining + this.DEFAULT_VOUCHER_NUM;
        updateVoucherDto.mealsRemaining =
            voucher.mealsRemaining + this.DEFAULT_VOUCHER_NUM;
        updateVoucherDto.snacksRemaining =
            voucher.snacksRemaining + this.DEFAULT_VOUCHER_NUM;
        return this.update(voucher.id, updateVoucherDto);
    }

    async findAll(): Promise<Voucher[]> {
        return this.repository.find();
    }

    async findOne(id: number): Promise<Voucher> {
        return this.repository.findOneBy({ id });
    }

    async findOneByVolunteer(volunteer: Volunteer): Promise<Voucher> {
        return this.repository.findOne({
            where: { volunteer: { id: volunteer.id } },
        });
    }

    async update(
        id: number,
        updateVoucherDto: UpdateVoucherDto,
    ): Promise<Voucher> {
        const voucher: Voucher = await this.repository.findOneBy({ id });
        if (!voucher) {
            throw new NotFoundException(`Voucher with ID:${id} not found`);
        }

        return this.repository.save({ ...voucher, ...updateVoucherDto });
    }

    async remove(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

    private async generateQRCode(voucher: CreateVoucherDto): Promise<string> {
        return QRCode.toDataURL(`${voucher.volunteer.id}`);
    }

    private async sendEmail(voucher: Voucher) {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to:
                process.env.NODE_ENV === 'production'
                    ? voucher.volunteer.email
                    : process.env.EMAIL_TO,
            subject: `Festival Voucher for ${voucher.volunteer.firstName}`,
            text: `Your festival voucher for ${voucher.volunteer.firstName} is here!`,
            attachDataUrls: true,
            html: `<img src="${voucher.code}"></img>`,
        };

        await this.mailerService.sendMail(mailOptions);
    }
}
