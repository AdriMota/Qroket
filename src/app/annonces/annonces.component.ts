import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { filter } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ModalService } from '../modals/add-animal/add-animal.service';
import { ModalServiceUpdate } from '../modals/update-animal/update-animal.service';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

@Component({
  selector: 'app-annonces-component',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss'],
  providers: [ModalService, ModalServiceUpdate]
})
export class AnnoncesComponent implements OnInit {

  animals: any;
  user: string;
  animal: any;
  animalFilter: any;

  animalLost: any;
  animalFind: any;

  @Input() showLost: boolean;
  @Input() showFind: boolean;
  @Input() showAll: boolean;
  @Input() update: boolean;

  @ViewChild("dynamicComponentContainer", { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef;

  @ViewChild("dynamicUpdateComponentContainer", { read: ViewContainerRef })
  dynamicUpdateComponentContainer: ViewContainerRef;

  constructor(private http: HttpClient, private authService: AuthService, modalCtrl: ModalController, private modalService: ModalService, private modalServiceUpdate: ModalServiceUpdate, private viewContainerRef: ViewContainerRef, private view: ViewContainerRef) {
    this.getAnimals();
  }

  ngOnInit() {
    this.authService.getUser$().pipe(filter(user => user != null),).subscribe(user => {
      this.user = user.id
    });
  }

  getAnimals() {
    this.http.get(environment.apiUrl + 'animals').subscribe(
      (response) => {
        if (!this.showAll) {
          this.animalFilter = response
          this.animalLost = this.animalFilter.filter(a => a.user == this.user && a.type == "lost")
          this.animalFind = this.animalFilter.filter(a => a.user == this.user && a.type == "find")
          // this.animals.sort((a, b) => a.date.localeCompare(b.date));
          console.log("ici", this.animalLost, this.animalFind)
        }console.log(this.animals)
        if (this.showAll) {
          this.animalFilter = response
          this.animalLost = this.animalFilter.filter(a => a.type == "lost")
          this.animalFind = this.animalFilter.filter(a => a.type == "find")
          // this.animals.sort((a, b) => a.date.localeCompare(b.date));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showAnimal(event: any, modalTitle: any, modalText: any, modalLocation: any, animalId: any, animalUser: any) {
    // let idAnimal = event.explicitOriginalTarget.attributes[1].value;
    event.preventDefault();
    if (!this.update) {
      this.modalService.addDynamicComponent(modalTitle, modalText, modalLocation, animalId, animalUser, this.viewContainerRef);
    }

    if (this.update) {  
      this.modalServiceUpdate.addDynamicComponent(modalTitle, modalText, modalLocation, animalId, animalUser, this.view);
    }
  }

}
