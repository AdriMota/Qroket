import { Animal } from "./animal";

/* export type AnimalResponse = {
    animal: Animal;
}; */

export type AnimalResponse = {
    id: string;
    name: string;
    age: number;
    description: string;
    fur: string;
    date: Date;
    type: string;
    picture: any;
    user: string;
    location: string;
};