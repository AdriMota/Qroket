import { Component, OnInit } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss'],
})
export class InfosComponent implements OnInit {

  message: String = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: String = "Toto";

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss(this.name, 'confirm');
  }

}
