import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss'],
})

export class AddAnimalComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  constructor(
    public modalCtrl : ModalController
  ) { } 

  message: String = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  photo: Array<string>;
  name: string = "Dyron";
  description: string = "Bonnie est une petite chienne de 8 ans et demi. Elle a des poils mi-longs blancs, gris et noirs. Elle a une mèche blanche entre les yeux. Bonnie répond à l\’appel de son prénom. Elle est docile mais un peu peureuse. Elle a été perdue à La Chaux-de-Fonds, au quartier des Forges.";
  user: string = "Baltazar Motano";
  userMail: string = "baltazar.motano@outlook.ch";
  userPhone: number = 41787654321;


  //création de l'instance de la modal. Contient les infos nécessaires pour afficher et gérer la modale
  async setModal() {
    //stocker la référence de la modal
    const modalAddAnimal = await this.modalCtrl.create({
      //nom de la classe qui est utilisé pour créer la modale. Importer ce composant dans ce fichier et déclarer dans les dépendances du module de l'app
      //propriété de l'objet de configuration. Permet de spécifier le composant modal à utiliser pour créer la modale
      component: AddAnimalComponent
    });
    return await modalAddAnimal.present();
  }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  // submitData() {
  //   this.modalCtrl.dismiss({ animal: this.animal });
  // }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
