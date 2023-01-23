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
    return this.http.get(`${this.apiUrl}${userId}/picture`, {responseType: 'blob'});
}
}