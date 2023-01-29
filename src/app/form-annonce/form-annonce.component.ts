import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-annonce',
  templateUrl: './form-annonce.component.html',
  styleUrls: ['./form-annonce.component.scss'],
})
export class FormAnnonceComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
}
