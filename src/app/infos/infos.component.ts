import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';


@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  //styleUrls: ['./infos.component.scss'],
})
export class InfosComponent {
  buttonValue: string;
  typeButton: any;
  inputType: string = 'text';

  mail: string = "baltazar.motano@outlook.ch";
  phone: number = 0;
  password: string = "**************";
  location: string = "1400 Yverdon-les-Bains";
  

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
          this.inputType = 'password';
          break;
        case ' Localisation ':
          this.typeButton = this.location;
          this.inputType = 'text';
          break;
        default:
          this.typeButton = "Information non disponible";
      }
  }

  getUser() {
    // Récupérer les informations de l'user connecté et les afficher dans les input
    this.auth.getUser$().pipe(filter(user => user != null),).subscribe(user => {

      this.mail = user.email;
      this.phone = user.phone;
      this.password = "************";
      this.location = user.location;

    });
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(this.typeButton, 'confirm');
  }

}
