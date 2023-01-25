import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as Leaflet from 'leaflet';
import { environment } from 'src/environments/environment';
import 'leaflet.locatecontrol';
import { AnimalsService } from 'src/app/services/animals.service';
import { AnimalResponse } from 'src/app/models/animals-response';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  map: Leaflet.Map;
  propertyList = [];
  animals: AnimalResponse[];
  locationsAnimals = [];

  constructor(
    private animalsService: AnimalsService,
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient
  ) { }

  async ionViewDidEnter() {
    const coordinates = await Geolocation.getCurrentPosition();

    const lat = coordinates.coords.latitude;
    const long = coordinates.coords.longitude;

    this.map = Leaflet.map('map', { zoomControl: false }).setView([lat, long], 17);

    Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(this.map);

    this.addControls();

    this.addMarkers(lat, long);

    // Récupérer la lat et la long lors d'un clic sur la map
    this.map.on('click', function (e) {
      const lat = e.latlng.lat;
      const long = e.latlng.lng;

      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${environment.tokenLocation}&types=place,postcode`)
        .then(response => response.json())
        .then(data => {

          let postcode = "";
          let city = "";

          data.features.forEach(function (feature) {
            //console.log(feature)
            if (feature.place_type.includes('postcode')) postcode = feature.text;
            if (feature.place_type.includes('place')) city = feature.text;
          });
          //console.log(postcode, city);
        });
    });
  }


  /***************************************************
   * ADD CONTROLS TO MAP
   ***************************************************/
  addControls() {
    Leaflet.control.zoom({
      position: 'topright'
    }).addTo(this.map);

    /* const locationIcon = Leaflet.icon({
      iconUrl: '../assets/markers/location.png',
      iconSize: [30, 30]
    }) */

    // L'ICONE NE S'AFFICHE PAS
    // D'après nos recherches, il s'agit d'un
    // bug de la nouvelle version de leaflet
    Leaflet.control.locate({
      position: 'topright',
      // icon: locationIcon
    }).addTo(this.map);
  }


  /***************************************************
   * ADD MARKERS TO MAP
   ***************************************************/
  addMarkers(lat, long) {
    const myPositionMarker = Leaflet.icon({
      iconUrl: '../assets/markers/Marker-blue.png',
      iconSize: [60, 60]
    });

    Leaflet.marker([lat, long], { icon: myPositionMarker }).addTo(this.map).bindPopup("Tu es là !");

    // Make an HTTP request to retrieve the animals.
    this.http.get(`${environment.apiUrl}animals`).subscribe((animals) => {
      for (const key in animals) {
        if (animals.hasOwnProperty(key)) {
          const animal = animals[key];
          let location = animal.location;

          this.foundLatLong(location);
        }
      }

      for (const locationAnimal of this.locationsAnimals) {
        //console.log(locationAnimal);
      }
      console.log(this.locationsAnimals);
    });

    fetch('../assets/data.json')
      .then(res => res.json())
      .then(data => {
        this.propertyList = data.properties;
        this.leafletMap();
      })
      .catch(err => console.error(err));
  }

  foundLatLong(locationAnimal) {
    //console.log(locationAnimal)

    // Make an HTTP request to retrieve the animals.
    this.http.get(`${environment.apiUrl}locations`).subscribe((locations) => {
      //console.log(locations)
      for (const key in locations) {
        if (locations.hasOwnProperty(key)) {
          const location = locations[key];
          /* console.log("location id ", location._id)
          console.log("locationAnimal ", locationAnimal) */
          if (locationAnimal === location._id) {
            const lat = location.location.coordinates[0];
            const long = location.location.coordinates[1];
            this.locationsAnimals.push([lat, long]);
          }
        }
      }
    });
  }


  leafletMap() {
    /* this.animalsService.getAnimals$().subscribe(animals => {
      this.animals = animals;
    });

    for (const animal of this.animals) {
      const animalMarker = Leaflet.icon({
        iconUrl: '../assets/markers/Marker-yellow.png',
        iconSize: [60, 60]
      }); */

    /* Leaflet.marker([animal.long, animal.lat], {icon: animalMarker})
      .addTo(this.map)
      .bindPopup(animal.name) */
    //.openPopup();
    //}

    for (const property of this.propertyList) {
      const animalMarker = Leaflet.icon({
        iconUrl: '../assets/markers/Marker-yellow.png',
        iconSize: [60, 60]
      });

      Leaflet.marker([property.long, property.lat], { icon: animalMarker })
        .addTo(this.map)
        .bindPopup(property.name)
      //.openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
