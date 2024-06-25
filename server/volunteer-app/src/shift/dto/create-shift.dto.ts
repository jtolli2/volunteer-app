import { Day, Time } from '../../shared/enums';
import { Volunteer } from '../../volunteer/entities/volunteer.entity';

export class CreateShiftDto {
    day: Day;
    time: Time;
    checkinTime?: Date = null;
    volunteer: Volunteer;
}
