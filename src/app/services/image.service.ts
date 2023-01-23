import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = environment.apiUrl + "users/";

  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData, userId: string) {
    return this.http.patch(`${this.apiUrl}${userId}/picture`, formData);
  }

  getImage(userId: string) {
    let picture = this.http.get<any>(`${this.apiUrl}${userId}/picture`);
    console.log(picture)
    return picture;
  }
}