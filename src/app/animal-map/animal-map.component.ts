import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Buffer } from 'buffer';


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
  picturesAnimal: Buffer;

  firstnameUser: string;
  lastnameUser: string;
  emailUser: string;
  phoneUser: number;
  

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    // Inject the HTTP client
    public http: HttpClient
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

        // Make an HTTP request to retrieve the user.
        this.http.get(`${environment.apiUrl}users/${this.userAnimal}`).subscribe((user) => {
          this.firstnameUser = user["firstname"];
          this.lastnameUser = user["lastname"];
          this.emailUser = user["email"];
          this.phoneUser = user["fuphoner"];
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

}