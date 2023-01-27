import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss'],
})

export class AddAnimalComponent implements OnInit {

  @Input() modalTitle: string;
  @Input() modalText: string;
  @Input() modalLocation: string;
  @Input() animalId : number;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(IonModal) modal: IonModal;

  constructor(
    public modalCtrl : ModalController
  ) { } 

  message: String;
  photo: Array<string>;
  name: string;
  description: string;
  user: string;
  userMail: string;
  userPhone: number;
  location: string; 
  id: number;

  async setModal() {
    const modalAddAnimal = await this.modalCtrl.create({
      component: AddAnimalComponent
    });
    return await modalAddAnimal.present();
  }

  ngOnInit() {
  }

  //le nom est peu indicatif....
  closeModal() {
    this.close.emit(event);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
  
  confirm() {
    this.modalCtrl.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    //lorsque cet événement se déclenche, il faudrait que la modal se supprime de la liste des modals
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}
