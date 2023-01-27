import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ImageService } from '../../services/image.service';
import { filter } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { InfosComponent } from 'src/app/infos/infos.component';


@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  //styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  profileImage: string; 
  firstname: string;
  lastname: string;
  locationId: string;
  city: string;

  //public isModalOpen: boolean = false;

  constructor(private authService: AuthService, private imageService: ImageService, public http: HttpClient, private modalController: ModalController) { }

  ngOnInit() {
    // Récupérer les informations de l'user connecté
    this.authService.getUser$().pipe(filter(user => user != null),).subscribe(user => {

      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.locationId = user.location;
      //console.log(user);

      this.imageService.getImage(user.id).subscribe(response => {
        //console.log(response);
        const blob = new Blob([response.data.data], { type: 'image/jpeg' });
        this.profileImage = URL.createObjectURL(blob);
        // this.convertBlobToUrl(blob);
      });
    });

    this.convertLocation();

    this.showData();

  }
    /* this.authService.getUser$().subscribe(user => {
      console.log(user.id)
      this.imageService.getImage(user.id).subscribe(response => {
        const blob = new Blob([response], { type: 'image/jpeg' });
        this.convertBlobToUrl(blob);
      });
    });

    //this.profileImage = "../../../assets/images/profile/Baltazar.png"
  } */

  convertLocation() {
    this.http.get(`${environment.apiUrl}locations/${this.locationId}`).subscribe((location) => {
      this.city = location["city"];
      
    });
  }
  
  showData() {
    //console.log(this.firstname, this.lastname, this.locationId)
  }

  async openModal(event) {
    let button = event.srcElement.childNodes[0].data;
    //console.log(button)
    const modal = await this.modalController.create({
      component: InfosComponent,
      componentProps: {
        buttonValue: button
      }
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if(role === 'confirm') {
      // PUSH DANS LA DB
      //this.message = `Hello, ${data}`;
    }
    //return await modal.present();
  }

  convertBlobToUrl(blob: Blob) {
    
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
       this.profileImage = reader.result as string;
    });
    reader.readAsDataURL(blob);
  }

}
