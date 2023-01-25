import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss'],
})

export class AddAnimalComponent implements OnInit {

  constructor(
    public data: any,
    public modalCtrl : ModalController
  ) { } 


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

  submitData() {
    this.modalCtrl.dismiss({ data: this.data });
  }

}
