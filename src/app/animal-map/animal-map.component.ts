import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { PictureService } from 'src/app/picture/picture.service';
//import { Buffer } from 'buffer';


@Component({
  selector: 'app-animal-map',
  templateUrl: './animal-map.component.html',
  styleUrls: ['./animal-map.component.scss'],
})
export class AnimalMapComponent implements OnInit {

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

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    public http: HttpClient,
    private pictureService: PictureService
  ) { 
    this.idAnimal = this.navParams.get('idAnimal');

    
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

          //this.takePicture();
        });
    });
  }

  ngOnInit() {
    
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picturesAnimal = picture.url;
    });
  }

}