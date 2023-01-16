import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from '../services/error-handling.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { debounceTime } from "rxjs";
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit {

  firstname: string = '';
  lastname: string = '';
  phone: number = null;
  email: string = '';
  password: string = '';
  // picture: any = '';
  // location: number = null;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  messageErrors: any = null;

  postcode: string;
  cities: any[] = [];

  lat: number;
  long: number;


  user: object = {};

  constructor(private http: HttpClient, public errorHandlingService: ErrorHandlingService) { }

  createUser(user) {

    const data = {
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
      password: this.password
    }

    this.http.post(environment.apiUrl + 'users', data).pipe(
      catchError((error: any) => {
        this.handleError(error, data);
        return throwError(error);
      })
    ).subscribe(response => {
      // console.log(response)
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  handleError(error: any, data: any) {
    if (error.error.indexOf("is required.") !== -1) {
      this.messageErrors = this.errorHandlingService.validateForm(data);
    }
  }

  onNpaChange() {
    this.http.get<any>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.postcode)}.json?access_token=${environment.tokenLocation}&proximity=${this.long},${this.lat}`).pipe(debounceTime(250)).subscribe(result => {
      let proprety = "place_name";
      this.cities = result.features.slice(0, 3).map(item => item[proprety]);
    })
  }

  onSelect(city: String) {
    console.log("changement de ville choisie", city)
  }

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude

    console.log(this.cities)
  }

}
