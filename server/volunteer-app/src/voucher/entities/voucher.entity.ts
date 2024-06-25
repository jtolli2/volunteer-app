import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Volunteer } from '../../volunteer/entities/volunteer.entity';

@Entity()
export class Voucher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    drinksRemaining: number;

    @Column()
    mealsRemaining: number;

    @Column()
    snacksRemaining: number;

    /* @Column()
    expiryDate: Date; */

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Volunteer, (volunteer) => volunteer.vouchers, {
        nullable: false,
        cascade: ['insert', 'update'],
        eager: true,
    })
    volunteer: Volunteer;
}
