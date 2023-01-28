import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  cityUser: string;
  cities: any[] = [];
  codes;

  lat: number;
  long: number;

  constructor() { }

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude
  }
  
  searchCity(inputCity) {
    console.log(inputCity);
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputCity}.json?access_token=${environment.tokenLocation}&proximity=${this.long},${this.lat}&limit=5`)
      .then(response => response.json())
      .then(data => {
        let proprety = "place_name";
        this.cities = data.features.slice(0, 5).map(item => item[proprety]);
        console.log(this.cities);
      });
  } 
}
