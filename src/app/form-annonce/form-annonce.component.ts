import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorHandlingService } from '../services/error-handling.service';
import { PictureService } from 'src/app/picture/picture.service';
import { Geolocation } from '@capacitor/geolocation';
import * as Leaflet from 'leaflet';


@Component({
  selector: 'app-form-annonce',
  templateUrl: './form-annonce.component.html',
  styleUrls: ['./form-annonce.component.scss'],
})
export class FormAnnonceComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  showAnswerApi: boolean = false;

  name: string;
  age: number;
  description: string;
  fur: string;
  date: string;
  type: string;
  location: string;
  user: string;
  picture: string;

  animal: object = {};
  map: Leaflet.Map;

  postcode: number;
  city: string;
  lat: number;
  long: number;

  locationId: string;


  messageErrors: any = null;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private http: HttpClient,
    public errorHandlingService: ErrorHandlingService,
    private pictureService: PictureService,
  ) { }

  ngOnInit() {
    this.showAnswerApi = false;

    this.authService.getUser$().subscribe(user => {
      this.user = user.id;
    });
  }

  async ionViewDidEnter() {
    const coordinates = await Geolocation.getCurrentPosition();

    const lat = coordinates.coords.latitude;
    const long = coordinates.coords.longitude;

    this.map = Leaflet.map('map', { zoomControl: true }).setView([lat, long], 15);

    Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(this.map);

    this.map.on('click', (e) => {
      this.lat = e.latlng.lat;
      this.long = e.latlng.lng;

      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.long},${this.lat}.json?access_token=${environment.tokenLocation}&types=place,postcode`)
        .then(response => response.json())
        .then(data => {
          data.features.forEach((feature) => {
            if (feature.place_type.includes('postcode')) this.postcode = feature.text;
            if (feature.place_type.includes('place')) this.city = feature.text;
          });
        });
      
      setTimeout(() => {
        const body = JSON.stringify(
          { ["npa"]: this.postcode,
            ["city"]: this.city,
            ["location"]: { 
              ["type"]: "Point", 
              ["coordinates"]: [ this.lat, this.long]
            }
          }
        );

        this.http.post(`${environment.apiUrl}locations`, body, this.httpOptions)
          .subscribe(
            (response) => {
              this.locationId = response["_id"]
            },
            (error) => {
              console.error('Error with PATCH request: ', error);
            }
          );

          //console.log("ON CLICK", this.postcode, this.city, this.lat, this.long);
      }, 1000);
    });
  }

  submitAnnonce() {
    //console.log(this.locationId)

    const data = {
      name: this.name,
      age: this.age,
      description: this.description,
      fur: this.fur,
      date: this.date,
      type: this.type,
      // location: this.location,
      //S'OCCUPER DE LA LOCALISATION
      location: this.locationId,
      pictures: this.picture,
      user: this.user
    }

    console.log(data)

    this.http.post(environment.apiUrl + 'animals', data).pipe(
      catchError((error: any) => {
        this.handleError(error, data);
        return throwError(error);
      })
    ).subscribe(
      (response) => {
        this.showAnswerApi = true;
      }, (error) => {
        console.error('Error with PATCH request: ', error);
      }
    )

  }
  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  handleError(error: any, data: any) {
    if (error.error.indexOf("is required.") !== -1) {
      this.messageErrors = this.errorHandlingService.validateFormAnimal(data);
    }
    if (error.error.indexOf("date: La date ne peut pas être dans le futur") !== -1) {
      this.messageErrors = this.errorHandlingService.validateDate(data);
    }
  }


  /**
    * Gestion de l'upload et l'affichage d'une image
    *
    * L'utilisateur ne peut ajouter qu'une seule photo
    * L'image est stockée sur une API spécialement conçue
    * 
 */
  uploadPicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture.url;
    });
    console.log(this.picture)
  }
}
