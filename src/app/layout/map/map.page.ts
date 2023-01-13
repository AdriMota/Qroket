import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  map: Leaflet.Map;
  propertyList = [];

  constructor() { }

  ionViewDidEnter() {
    this.map = new Leaflet.Map('map').setView([42.35663, -71.1109], 16);

    Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(this.map);

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
      Leaflet.marker([property.lat, property.long]).addTo(this.map)
        //.bindPopup(property.city)
        .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }

}
