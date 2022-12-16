import { EmailValidator } from "@angular/forms";

export type User = {
    firstname: string;
    lastname: string;
    phone: number;
    email: string;
    password: string;
    picture: any;
    role: string;
    location: number;
};