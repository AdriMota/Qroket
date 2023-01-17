import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as Leaflet from 'leaflet';
import { environment } from 'src/environments/environment'; 

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
      
      // Récupérer la lat et la long lors d'un clic sur la map
      this.map.on('click', function(e) {
        const lat = e.latlng.lat;
        const long = e.latlng.lng;

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${environment.tokenLocation}&types=place,postcode`)
          .then(response => response.json())
          .then(data => {

            let postcode = "";
            let city = "";

            data.features.forEach(function(feature) {
              //console.log(feature)
                if (feature.place_type.includes('postcode')) postcode = feature.text;
                if (feature.place_type.includes('place')) city = feature.text;
            });
            //console.log(postcode, city);
          });

      });
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
