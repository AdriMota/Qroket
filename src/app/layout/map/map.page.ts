import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as Leaflet from 'leaflet';
import { environment } from 'src/environments/environment';
import 'leaflet.locatecontrol';
import { AnimalsService } from 'src/app/services/animals.service';
import { AnimalResponse } from 'src/app/models/animals-response';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { AnimalMapComponent } from 'src/app/animal-map/animal-map.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage {

  map: Leaflet.Map;
  animals: AnimalResponse[];
  // locationsAnimals: Array<string>;

  constructor(
    private animalsService: AnimalsService,
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient,
    private modalController: ModalController
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

      Object.keys(animals).forEach(key => {
        let nameAnimal = animals[key].name;
        let descriptionAnimal = animals[key].description;
        let idAnimal = animals[key]._id;
        let locationIdAnimal = animals[key].location;
        let userAnimal = animals[key].user;

        // Make an HTTP request to retrieve the locations.
        this.http.get(`${environment.apiUrl}locations/`).subscribe((locations) => {
          Object.keys(locations).forEach(key => {
            let location = locations[key];

            if (locationIdAnimal == location["_id"]) {
              lat = location["location"].coordinates[0];
              long = location["location"].coordinates[1]

              const animalMarker = Leaflet.icon({
                iconUrl: '../assets/markers/Marker-yellow.png',
                iconSize: [60, 60]
              });

              Leaflet.marker([lat, long], { icon: animalMarker }).addTo(this.map).on('click', () => {
                this.openModal(idAnimal);
              });

              //this.locationsAnimals.push([idAnimal, nameAnimal, locationIdAnimal, lat, long])
            }
          })
        });
      });
    });

    /* console.log(this.locationsAnimals)
    
    for (const infoAnimal of this.locationsAnimals) {
      console.log(infoAnimal)
    } */
  }

  async openModal(idAnimal) {
    const modal = await this.modalController.create({
      component: AnimalMapComponent,
      componentProps: {
        idAnimal: idAnimal
      }
    });

    modal.present();

    await modal.onWillDismiss();
  }


  ionViewWillLeave() {
    this.map.remove();
  }

}
