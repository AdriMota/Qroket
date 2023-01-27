import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss'],
})

export class AddAnimalComponent implements OnInit {

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


  async setModal() {
    const modalAddAnimal = await this.modalCtrl.create({
      component: AddAnimalComponent
    });
    return await modalAddAnimal.present();
  }

  ngOnInit() {
    console.log(this.animalUser)
    this.http.get(`https://qroket-api.onrender.com/users/${this.animalUser}`)
      .subscribe((response) => {
        this.userName = response["firstname"];
        this.userLastName = response["lastname"];
        this.userEmail = response["email"];
        this.userPhone = response["phone"].toString().replace(/(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");;
        this.userName = response["firstname"];
        //this.user.picture = response["picture"];
      });
  }s

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

  confirm() {
    this.modalCtrl.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.modalClose.emit();
  }
}
