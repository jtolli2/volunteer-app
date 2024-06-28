import { Day, Time } from '../shared/enums';
import { Volunteer } from './Volunteer';

export class Shift {
    constructor(
        public id: number,
        public day: Day,
        public time: Time,
        public checkinTime: Date,
        public volunteer: Volunteer
    ) {}
}
