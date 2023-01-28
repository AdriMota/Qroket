import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
  styleUrls: ['./update-animal.component.scss'],
})
export class UpdateAnimalComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  @Input() modalTitle: string;
  @Input() modalText: string;
  @Input() modalLocation: string;
  @Input() animalId: number;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(IonModal) modal: IonModal;

  constructor(
    public modalCtrl: ModalController, private http: HttpClient 
  ) { }

  photo: Array<string>;
  name: string;
  description: string;
  location: string;
  id: number;

  animalUser: number;
  userName: string;
  userLastName: string;
  userEmail: string;
  userPhone: string;

  disableButton: boolean = true;
  newData: any;

  compteur: number = 0;

  async setModal() {
    const modalUpdateAnimal = await this.modalCtrl.create({
      component: UpdateAnimalComponent
    });
    return await modalUpdateAnimal.present();
  }

  ngOnInit() {
    this.http.get(`https://qroket-api.onrender.com/users/${this.animalUser}`)
      .subscribe((response) => {
        this.userName = response["firstname"];
        this.userLastName = response["lastname"];
        this.userEmail = response["email"];
        this.userPhone = response["phone"].toString().replace(/(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");;
        this.userName = response["firstname"];
        //this.user.picture = response["picture"];
      });
  }

  //le nom est peu indicatif....Correspond à l'ouverture de la modal
  closeModal() {
    this.close.emit(event);
  }

  ngOnDestroy() {
    this.modal;
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.modalClose.emit();
  }

  updateInput() {
    this.disableButton = (this.compteur = 0) ? true : false;
    this.compteur++
  }

  //NE ME LAISSE PAS MODIFIER LES INFORMATIONS. RETOURNE "PAS LES DROITS"
  confirm() {
    this.newData = {
      name: this.name,
      description: this.description,
    }
    const body = JSON.stringify(this.newData);

    console.log(body)

    this.http.patch(`${environment.apiUrl}animals/${this.id}`, body, this.httpOptions)
    .subscribe(
      (response) => {
        console.log('Successful PATCH request: ', response);
      },
      (error) => {
        console.error('Error with PATCH request: ', error);
      }
    );
    this.modalCtrl.dismiss(this.name, 'confirm');
    //RECHARGER LA PAGE
  }

  deleteAnimal(){
    this.http.delete(`${environment.apiUrl}animals/${this.id}`)
    .subscribe(
        (response) => {
            console.log('Successful DELETE request: ', response);
        },
        (error) => {
            console.error('Error with DELETE request: ', error);
        }
    )
    //RECHARGER LA PAGE
  }
}
