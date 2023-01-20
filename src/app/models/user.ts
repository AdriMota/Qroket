import { EmailValidator } from "@angular/forms";

export type User = {
    id: string;
    firstname: string;
    lastname: string;
    phone: number;
    email: string;
    password: string;
    picture: Buffer;
    role: string;
    location: number;
};