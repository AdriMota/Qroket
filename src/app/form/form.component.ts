import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from '../services/error-handling.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';

// import { NgForm } from '@angular/forms';
// import { Location } from '@angular/common';
// import { debounceTime } from "rxjs";
// import { SharingModule } from '../sharing/sharing.module';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit {

  @ViewChild('mySelect', { static: true }) mySelect: IonSelect;

  firstname: string = '';
  lastname: string = '';
  phone: number = null;
  email: string = '';
  password: string = '';
  location: string = '';
  // picture: string = '';

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  messageErrors: any = null;

  postcode: string;
  cities: any[] = [];

  lat: number;
  long: number;

  selectedOption: string = "";

  user: object = {};


  cityUser: string;
  codes;

  newCity: string = "";


  constructor(private http: HttpClient, public errorHandlingService: ErrorHandlingService, private router: Router) {
  }

  async ngOnInit() {

    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude

    console.log(this.lat)
  }

  createUser(user) {

    this.newCity = this.newCity.substring(0, this.newCity.indexOf(","));
    this.location = this.newCity;

    const data = {
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
      password: this.password,
      location: this.location
    }

    this.http.post(environment.apiUrl + 'users', data).pipe(
      catchError((error: any) => {
        this.handleError(error, data);
        console.log("ici", error.error)
        return throwError(error);
      })
    ).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login']);
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
    if(error.error.indexOf("E11000 duplicate key error collection: test.users index: email_1 dup key") !== -1){
      this.messageErrors = this.errorHandlingService.validateDoubleKey(data);
    }
  }

  searchCity(inputCity) {

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputCity}.json?access_token=${environment.tokenLocation}&proximity=${this.long},${this.lat}&limit=5`)
      .then(response => response.json())
      .then(data => {
        let proprety = "place_name";
        this.cities = data.features.slice(0, 5).map(item => item[proprety]);
      });

      this.newCity = inputCity;
  }

}
