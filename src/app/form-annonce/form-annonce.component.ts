import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-annonce',
  templateUrl: './form-annonce.component.html',
  styleUrls: ['./form-annonce.component.scss'],
})
export class FormAnnonceComponent implements OnInit {

  showForm: boolean;
  showAnswerApi: boolean = false;

  name: string = '';
  age: number = null;
  description: string = '';
  fur: string = '';
  date: string = '';
  type: string = '';
  location: string = '';
  user: string = '';

  animal: object = {};

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.showForm = true;
    this.showAnswerApi = false;

    this.authService.getUser$().subscribe(user => {
     this.user = user.id;
    });
  }

  submitAnnonce() {
    this.showForm = false;
    this.showAnswerApi = true;

    const data = {
      name: this.name,
      age: this.age,
      description: this.description,
      fur: this.fur,
      date: this.date,
      type: this.type,
      location: this.location,
      user: this.user
    }

    console.log(data);
    console.log(`${environment.apiUrl}animals`);

    //this.http.post(`${environment.apiUrl}animals`, data);

  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
}
