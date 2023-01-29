import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorHandlingService } from '../services/error-handling.service';
import { PictureService } from 'src/app/picture/picture.service';


@Component({
  selector: 'app-form-annonce',
  templateUrl: './form-annonce.component.html',
  styleUrls: ['./form-annonce.component.scss'],
})
export class FormAnnonceComponent implements OnInit {

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

  submitAnnonce() {
    const data = {
      name: this.name,
      age: this.age,
      description: this.description,
      fur: this.fur,
      date: this.date,
      type: this.type,
      // location: this.location,
      //S'OCCUPER DE LA LOCALISATION
      location: "63ca603e4b5e21bcfc611f25",
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
