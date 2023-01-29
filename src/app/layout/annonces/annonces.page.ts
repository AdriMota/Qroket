import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "../../../environments/environment";
import { ShareDataServiceService } from 'src/app/services/share-data-service.service';
import { ModalController } from '@ionic/angular';
import { AnimalMapComponent } from 'src/app/animal-map/animal-map.component';
import { filter } from 'rxjs';
import { FormAnnonceComponent } from 'src/app/form-annonce/form-annonce.component';


@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.page.html',
  styleUrls: ['./annonces.page.scss'],
})

export class AnnoncesPage {

  showForm: boolean;

  nameAnimal: string;
  idAnimal: string;
  typeAnimal: string;
  userId: string;
  picturesAnimal: string;

  constructor(
    private auth: AuthService,
    public http: HttpClient,
    private sharedData: ShareDataServiceService,
    private modalController: ModalController
  ) { }

  ionViewWillEnter() {
    this.sharedData.addAnimalsForm$.subscribe(val => {
      this.showForm = val;
    });

    // Récupérer les informations de l'user connecté
    this.auth.getUser$().pipe(filter(user => user != null),).subscribe(user => {
      this.userId = user.id;
    });

    // Make an HTTP request to retrieve the animals.
    this.http.get(`${environment.apiUrl}animals`).subscribe((animals) => {

      Object.keys(animals).forEach(key => {
        if(this.userId == animals[key].user) {
          this.idAnimal = animals[key]._id;
          this.nameAnimal = animals[key].name;
          this.typeAnimal = animals[key].type;
          this.picturesAnimal = animals[key].pictures;

          this.showAnimals(this.idAnimal);
        }
      });

    });
  }

  showAnimals(animalId) {
    if(this.typeAnimal == "find") {
      let newDiv = document.createElement("ion-card");
      newDiv.setAttribute("class", "animal");
      newDiv.setAttribute("style", "box-shadow: none !important; margin-inline: 0px;");
      newDiv.addEventListener("click", () => this.onAnimalsClick(animalId));
      document.getElementById("div-find").appendChild(newDiv);

      let newImg = document.createElement("img");
      newImg.setAttribute("style", "border-radius: 10px; object-fit: cover;");
      newImg.setAttribute("src", this.picturesAnimal);
      // newImg.setAttribute("src", "../../../assets/images/animals/Dog.jpg");
      newDiv.appendChild(newImg);

      let newP = document.createElement("ion-card-title");
      newP.setAttribute("style", "font-size: large; font-weight: normal;");
      newP.innerHTML = this.nameAnimal;
      newDiv.appendChild(newP);  
    } else if(this.typeAnimal == "lost") {
      let newDiv = document.createElement("ion-card");
      newDiv.setAttribute("class", "animal");
      newDiv.setAttribute("style", "box-shadow: none !important; margin-inline: 0px;");
      newDiv.addEventListener("click",  () => this.onAnimalsClick(animalId));
      document.getElementById("div-lost").appendChild(newDiv);

      let newImg = document.createElement("img");
      newImg.setAttribute("src", this.picturesAnimal);
      newImg.setAttribute("style", "border-radius: 10px; object-fit: cover;");
      // newImg.setAttribute("src", "../../../assets/images/animals/Dog.jpg");
      newDiv.appendChild(newImg); 

      let newP = document.createElement("ion-card-title");
      newP.setAttribute("style", "font-size: large; font-weight: normal;");
      newP.innerHTML = this.nameAnimal;
      newDiv.appendChild(newP); 
    }

    //console.log(this.idAnimal, this.nameAnimal, this.typeAnimal)
  }

  onAnimalsClick(idAnimal) {
    this.openModal(idAnimal);
  }

  async openModal(idAnimal) {
    const modal = await this.modalController.create({
      component: AnimalMapComponent,
      componentProps: {
        idAnimal: idAnimal
      }
    });

    modal.present();

    await modal.onWillDismiss();
  }

  async openFormAnnonceModal() {
    const modal = await this.modalController.create({
      component: FormAnnonceComponent
    });
    return await modal.present();
  }

  handleClick(data: any) {
    this.sharedData.addAnnonce(); 
  }
}
