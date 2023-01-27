import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { filter } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ModalService } from '../modals/add-animal/add-animal.service';

@Component({
  selector: 'app-annonces-component',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss'],
  providers: [ModalService]
})
export class AnnoncesComponent implements OnInit {

  animals: any;
  user: string;
  animal: any;
  animalFilter: any;

  @Input() showLost: boolean;
  @Input() showFind: boolean;
  @Input() showAll: boolean;

  @ViewChild("dynamicComponentContainer", { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef;

  constructor(private http: HttpClient, private authService: AuthService, modalCtrl: ModalController,  private modalService: ModalService, private viewContainerRef: ViewContainerRef) { 
    this.getAnimals();
  }
 
  ngOnInit() {
    this.authService.getUser$().pipe(filter(user => user != null),).subscribe(user => {
      this.user = user.id
    });
  }

  getAnimals() {
    this.http.get( environment.apiUrl + 'animals').subscribe(
      (response) => {
        if(!this.showAll){
          this.animalFilter = response
          this.animals = this.animalFilter.filter(a => a.user == this.user)
        }
        if(this.showAll){
          this.animals = response;
          this.animals.sort((a, b) => a.date.localeCompare(b.date));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showAnimal(event: any, modalTitle: any, modalText: any, modalLocation: any, animalId: any){
    // let idAnimal = event.explicitOriginalTarget.attributes[1].value;
    event.preventDefault();
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.addDynamicComponent(modalTitle, modalText, modalLocation, animalId);
  }

  }
