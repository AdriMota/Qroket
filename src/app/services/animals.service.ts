import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Animal } from "../models/animal";
import { Observable } from 'rxjs';
import { AnimalResponse } from '../models/animals-response';

const API_URL = "https://qroket-api.onrender.com/";


@Injectable({ providedIn: 'root' })

export class AnimalsService {

  constructor(private http: HttpClient, private storage: Storage) {}

  getAnimals$(): Observable<Animal[]> {
    const animalsUrl = `${API_URL}/animals`;
    return this.http.get<AnimalResponse[]>(animalsUrl);
  }
}