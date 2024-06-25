import { IsEmail } from 'class-validator';

export class CreateVolunteerDto {
    firstName: string;
    lastName: string;
    @IsEmail()
    email: string;
}
