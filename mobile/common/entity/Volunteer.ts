import { Shift } from './Shift';
import { Voucher } from './Voucher';

export class Volunteer {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public __shifts__: Shift[],
        public __vouchers__: Voucher[]
    ) {}
}
