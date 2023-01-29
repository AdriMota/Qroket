import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  //styleUrls: ['./infos.component.scss'],
})

export class InfosComponent {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  buttonValue: string;
  typeButton: any;
  inputType: string = 'text';

  userId: string;
  mail: string = "baltazar.motano@outlook.ch";
  phone: number = 0;
  password: string = "Hdslap!$$00ddia_";
  location: string;
  locationUser: string;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  showIcon: boolean = false;

  isDelete: boolean = false;

  disableButton: boolean = true;
  newData: any;
  property: string;

  newIdLoca: string;
  newLoca: string;
  onlyLoca: boolean = false;

  localisation: any;
  alreadyExist: boolean = false;

  test: boolean = false;

  compteur: number = 1;

  constructor(private modalController: ModalController,
    private navParams: NavParams,
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient,
    private router: Router
  ) {

    this.getUser();

    this.buttonValue = this.navParams.get('buttonValue');
    this.onlyLoca = this.buttonValue == " Localisation " ? true : false;
    this.location = typeof (this.location) == "undefined" ? "Insérer une location" : this.location

    switch (this.buttonValue) {
      case ' Adresse mail ':
        this.typeButton = this.mail;
        this.inputType = 'email';
        break;
      case ' Téléphone ':
        this.typeButton = this.phone;
        this.inputType = 'number';
        break;
      case ' Mot de passe ':
        this.typeButton = this.password;
        this.showIcon = true;
        break;
      case ' Localisation ':
        this.typeButton = this.location;
        this.inputType = 'text';
        // this.http.get(`${environment.apiUrl}locations/${this.locationId}`).subscribe((location) => {
        // let npa = location["npa"];
        // let city = location["city"];
        // this.locationUser = npa + " " + city;
        // this.typeButton = this.locationUser;
        // this.inputType = 'text';
        // this.locationId = location["city"]
        // this.localisation = location["city"]
        // });
        console.log(this.typeButton)
        break;
      case ' Supprimer le compte ':
        this.typeButton = this.password;
        this.showIcon = true;
        this.isDelete = true;
        break;
      default:
        this.typeButton = "Information non disponible";
    }
  }

  getUser() {
    // Récupérer les informations de l'user connecté et les afficher dans les input
    this.auth.getUser$().pipe(filter(user => user != null),).subscribe(user => {

      this.userId = user.id;
      this.mail = user.email;
      this.phone = user.phone;
      this.password = "Hdslap!$$00ddia_";
      this.location = user.location;

      console.log(this.location)

    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  updateInput() {
    // Afficher le bouton
    if (this.typeButton) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }

    // Récupérer les changements
    switch (this.buttonValue) {
      case ' Adresse mail ':
        this.property = "email"
        this.newData = this.typeButton;
        break;
      case ' Téléphone ':
        this.property = "phone"
        this.newData = this.typeButton;
        break;
      case ' Mot de passe ':
        this.property = "password"
        this.newData = this.typeButton;
        break;
      case ' Localisation ':
        this.property = "location"
        this.newData = this.typeButton;
        break;
      case ' Supprimer le compte ':
        this.newData = this.typeButton;
        break;
    }
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.property === "location") {
      this.newData = this.newData.substring(0, this.newData.indexOf(","));
      this.location = this.newData;
    }

    const body = JSON.stringify({ [this.property]: this.newData });
    // console.log(body)
    // console.log(`${environment.apiUrl}users/${this.userId}`)
    this.http.patch(`${environment.apiUrl}users/${this.userId}`, body, this.httpOptions)
      .subscribe(
        (response) => {
          console.log('Successful PATCH request: ', response);
        },
        (error) => {
          console.error('Error with PATCH request: ', error);
        }
      );
    // DEMANDER DE SE RECONNECTER

    return this.modalController.dismiss(this.typeButton, 'confirm');
  }


  deleteAccount(){
    this.http.delete(`https://qroket-api.onrender.com/users/${this.userId}`).subscribe(
      res => {
        console.log('Utilisateur supprimé !');
        this.modalController.dismiss(this.typeButton, 'confirm');
        this.router.navigate(['/login']);
      },
      err => {
        console.error('Erreur lors de la suppression de l\'utilisateur :', err);
      }
    );
  } 


  newValue(value) {
    //désactiver le bouton
    this.disableButton = false ? true : false;

    //récupérer les changements
    this.property = "location"
    this.newData = value;
  }
}


    //-------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------

    // if (this.property === "location") {
    //   //vérifier si la location existe déjà dans la BDD
    //   this.newData = this.newData.substring(0, this.newData.indexOf(","));

    //   this.http.get(`${environment.apiUrl}locations`).subscribe((response) => {
    //     Object.keys(response).forEach(key => {
    //       this.alreadyExist = response[key].city == this.newData ? true : false;  

    //       if (this.alreadyExist) {
    //         //lier l'id de la localisation à l'utilisateur
    //         this.newIdLoca = response[key]._id;
    //         //SPAM DES API, ON A VOULU CHANGER MAAAIS PAS RÉUSSI..
    //         const body = JSON.stringify({ [this.property]: this.newIdLoca });

    //         this.http.patch(`${environment.apiUrl}/users/${this.userId}`, body, this.httpOptions).subscribe(
    //           (response) => {
    //             console.log('Successful PATCH request: ', response);
    //           },
    //           (error) => {
    //             console.error('Error with PATCH request: ', error);
    //           }
    //         );
    //         this.test = true;
    //       } 
    //     })
    //   });
    //   if (!this.test){
    //     //obtenir npa et coordonnées de la nouvelle location
    //     fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.newData}.json?access_token=${environment.tokenLocation}`)
    //       .then(response => response.json())
    //       .then(data => {
    //         let coordinates = data.features[0].geometry.coordinates
    //         let lat = coordinates[1]
    //         let long = coordinates[0]

    //         let coordinate = [lat, long]

    //         fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${environment.tokenLocation}&types=place,postcode`)
    //           .then(response => response.json())
    //           .then(data => {

    //             let postcode = "";
    //             let city = "";

    //             data.features.forEach(function (feature) {
    //               if (feature.place_type.includes('postcode')) postcode = feature.text;
    //               if (feature.place_type.includes('place')) city = feature.text;
    //             });

    //             //créer la nouvelle location
    //             let newLoca = {
    //               "location": {
    //                 "type": "Point",
    //                 "coordinates": coordinate
    //               },
    //               "npa": postcode,
    //               "city": city
    //             }
    //             const body = JSON.stringify(newLoca);
    //             if (this.compteur <= 1) {
    //               //envoyer la nouvelle localisation
    //               this.http.post(`${environment.apiUrl}locations`, body, this.httpOptions)
    //                 .subscribe(
    //                   (response) => {
    //                     console.log('Successful PATCH request: ', response);
    //                     this.newIdLoca = response["_id"];

    //                     const body = JSON.stringify({ [this.property]: this.newIdLoca });
    //                     console.log(body)
    //                     this.http.patch(`${environment.apiUrl}/users/${this.userId}`, body, this.httpOptions).subscribe(
    //                       (response) => {
    //                         console.log('Successful PATCH request: ', response);
    //                       },
    //                       (error) => {
    //                         console.error('Error with PATCH request: ', error);
    //                       }
    //                     );
    //                   },
    //                   (error) => {
    //                     console.error('Error with PATCH request: ', error);
    //                   }
    //                 );
    //               this.compteur++
    //             }
    //           });
    //       });

    //-------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------
