import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Shift } from '../../shift/entities/shift.entity';
import { Voucher } from '../../voucher/entities/voucher.entity';

@Entity({
    orderBy: {
        firstName: 'ASC',
        lastName: 'ASC',
    },
})
export class Volunteer {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Shift, (shift) => shift.volunteer, {
        cascade: true,
        lazy: true,
    })
    shifts: Promise<Shift[]>;

    @OneToMany(() => Voucher, (voucher) => voucher.volunteer, {
        cascade: true,
        lazy: true,
    })
    vouchers: Promise<Voucher[]>;

    /* addShift(shift: Shift): void {
        this.shifts.push(shift);
        shift.volunteer = this;
    }

    addVoucher(voucher: Voucher): void {
        this.vouchers.push(voucher);
        voucher.volunteer = this;
    } */
}
