import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PictureService } from 'src/app/picture/picture.service';
import { AuthService } from '../auth/auth.service';
import { filter } from 'rxjs';
//import { Buffer } from 'buffer';


@Component({
  selector: 'app-animal-map',
  templateUrl: './animal-map.component.html',
  styleUrls: ['./animal-map.component.scss'],
})
export class AnimalMapComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  animal: any;
  idAnimal: string;
  nameAnimal: string;
  ageAnimal: number;
  descriptionAnimal: string;
  furAnimal: string;
  userAnimal: string;
  locationAnimal: string;
  picturesAnimal: string;
  //picturesAnimal: Buffer;  

  firstnameUser: string;
  lastnameUser: string;
  emailUser: string;
  phoneUser: number;
  pictureUser: string;

  idUserAuth: string;

  yourAnnouncement: boolean = false;
  showAnswerApi: boolean = false;

  newName: string;
  newDescription: string;
  newFur: string;

  isInactive: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    public http: HttpClient,
    private pictureService: PictureService,
    private auth: AuthService
  ) { 
    this.idAnimal = this.navParams.get('idAnimal');
  }

  ngOnInit() {
    this.showAnswerApi = false;
    console.log("ngOnInit", this.showAnswerApi)
    // Récupérer les informations de l'user connecté
    this.auth.getUser$().pipe(filter(user => user != null),).subscribe(user => {
      this.idUserAuth = user.id;
    });

    // Make an HTTP request to retrieve the animal.
    this.http.get(`${environment.apiUrl}animals/${this.idAnimal}`).subscribe((animal) => {
      this.nameAnimal = animal["name"];
      this.ageAnimal = animal["age"];
      this.descriptionAnimal = animal["description"];
      this.furAnimal = animal["fur"];
      this.userAnimal = animal["user"];
      this.locationAnimal = animal["location"];
      this.picturesAnimal = animal["pictures"];

      // Make an HTTP request to retrieve the user.
      this.http.get(`${environment.apiUrl}users/${this.userAnimal}`).subscribe((user) => {
        this.firstnameUser = user["firstname"];
        this.lastnameUser = user["lastname"];
        this.emailUser = user["email"];
        this.phoneUser = user["fuphoner"];
        this.pictureUser = user["picture"];

        if(this.userAnimal == this.idUserAuth) {
          this.yourAnnouncement = true;
        }

        //this.takePicture();
      });
    });
  }

  cancel() {
    this.yourAnnouncement = false;
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  
  confirm() {
    const body = JSON.stringify({ ["name"]: this.newName, ["description"]: this.newDescription, ["fur"]: this.newFur });
    console.log(body);
    console.log(`${environment.apiUrl}animals/${this.idAnimal}`)
    this.http.patch(`${environment.apiUrl}animals/${this.idAnimal}`, body, this.httpOptions)
      .subscribe(
        (response) => {
          this.showAnswerApi = true;
          console.log("confirm", this.showAnswerApi)

        },
        (error) => {
          console.error('Error with PATCH request: ', error);
        }
      );

    // OBLIGATION DE REFRESH POUR VOIR LES CHANGEMENTS
    //return this.modalCtrl.dismiss(null, 'confirm');
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picturesAnimal = picture.url;
    });
  }

  deleteAnnouncement() {
    console.log("Annonce supprimée")
  }

  updateInput() {
    this.isInactive = false;
    this.newName = this.nameAnimal;
    this.newDescription = this.descriptionAnimal;
    this.newFur = this.furAnimal;
  }
}