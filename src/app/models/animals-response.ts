import { Animal } from "./animal";

export type AnimalResponse = {
    _id: string;
    name: string;
    age: number;
    description: string;
    fur: string;
    date: Date;
    type: string;
    picture: any;
    user: number;
    location: number;
};