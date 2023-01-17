import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Animal } from "../models/animal";
import { Observable } from 'rxjs';
import { AnimalResponse } from '../models/animals-response';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })

export class AnimalsService {

  constructor(private http: HttpClient, private storage: Storage) {}

  getAnimals$(): Observable<Animal[]> {
    const animalsUrl = `${environment.apiUrl}animals`;
    return this.http.get<AnimalResponse[]>(animalsUrl);
  }
}