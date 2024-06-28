import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Day, Time } from '../../shared/enums';
import { Volunteer } from '../../volunteer/entities/volunteer.entity';

@Entity({
    orderBy: {
        day: 'ASC',
        time: 'ASC',
    },
})
export class Shift {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'simple-enum',
        enum: Day,
        nullable: false,
    })
    day: string;

    @Column({
        type: 'simple-enum',
        enum: Time,
        nullable: false,
    })
    time: string;

    @Column({
        nullable: true,
    })
    checkinTime: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Volunteer, (volunteer) => volunteer.shifts, {
        nullable: false,
        cascade: ['insert', 'update'],
        eager: true,
    })
    volunteer: Volunteer;
}
