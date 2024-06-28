import { Volunteer } from "./Volunteer";

export class Voucher {
    constructor(
        public id: number,
        public code: string,
        public drinksRemaining: number,
        public mealsRemaining: number,
        public snacksRemaining: number,
        public volunteer: Volunteer
    ) {}
}
