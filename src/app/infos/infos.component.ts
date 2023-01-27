import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';


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
  location: string = "1400 Yverdon-les-Bains";
  locationUser: string;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  showIcon: boolean = false;

  disableButton: boolean = true;
  newData: any;
  property: string;


  constructor(private modalController: ModalController,
    private navParams: NavParams,
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient
  ) {

    this.getUser();

    this.buttonValue = this.navParams.get('buttonValue');

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
        this.http.get(`${environment.apiUrl}locations/${this.location}`).subscribe((location) => {
          let npa = location["npa"];
          let city = location["city"];
          this.locationUser = npa + " " + city;
    
          this.typeButton = this.locationUser;
          this.inputType = 'text';
        });
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
    }
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    const body = JSON.stringify({ [this.property]: this.newData });
    console.log(body)
    console.log(`${environment.apiUrl}users/${this.userId}`)
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

}
