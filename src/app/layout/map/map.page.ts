import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  map: Leaflet.Map;
  propertyList = [];

  constructor() {}

  async ionViewDidEnter() {
    const coordinates = await Geolocation.getCurrentPosition();

    const lat = coordinates.coords.latitude;
    const long = coordinates.coords.longitude;

    this.map = Leaflet.map('map').setView([lat, long], 17);

      Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }).addTo(this.map); 

      const myPositionMarker = Leaflet.icon({
        iconUrl: '../assets/markers/Marker-blue.png',
        iconSize: [60, 60]
      });

      const marker = Leaflet.marker([lat, long], {icon: myPositionMarker}).addTo(this.map).bindPopup("Tu es là !");

      fetch('../assets/data.json')
        .then(res => res.json())
        .then(data => {
          this.propertyList = data.properties;
          this.leafletMap();
        })
        .catch(err => console.error(err));
  }

  leafletMap() {
    for (const property of this.propertyList) {
      const animalMarker = Leaflet.icon({
        iconUrl: '../assets/markers/Marker-yellow.png',
        iconSize: [60, 60]
      });

      Leaflet.marker([property.long, property.lat], {icon: animalMarker})
        .addTo(this.map)
        .bindPopup(property.name)
        //.openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
