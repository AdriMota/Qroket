import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ImageService } from '../../services/image.service';
import { filter } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { InfosComponent } from 'src/app/infos/infos.component';
import { PictureService } from 'src/app/picture/picture.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  //styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  profileImage: string; 
  firstname: string;
  lastname: string;
  location: string;
  city: string;
  pictureUser: string;

  //public isModalOpen: boolean = false;

  constructor(
    private authService: AuthService, 
    //private imageService: ImageService, 
    public http: HttpClient, 
    private modalController: ModalController,
    private pictureService: PictureService,
    private router: Router,
    ) { }

  ngOnInit() {
    // Récupérer les informations de l'user connecté
    this.authService.getUser$().pipe(filter(user => user != null),).subscribe(user => {

      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.location = user.location;
      this.pictureUser = user.picture;
      this.profileImage = "../../../assets/images/profile/Baltazar.png"

      //this.takePicture();

      /* ---------------------------------------
          * IMAGE
        --------------------------------------- */
      /* this.imageService.getImage(user.id).subscribe(response => {
        //console.log(response);
        const blob = new Blob([response.data.data], { type: 'image/jpeg' });
        this.profileImage = URL.createObjectURL(blob);
        // this.convertBlobToUrl(blob);
      }); */
    });
  }

    /* ---------------------------------------
      * IMAGE
    --------------------------------------- */
    /* this.authService.getUser$().subscribe(user => {
      console.log(user.id)
      this.imageService.getImage(user.id).subscribe(response => {
        const blob = new Blob([response], { type: 'image/jpeg' });
        this.convertBlobToUrl(blob);
      });
    });
  } */

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

    await modal.onWillDismiss();
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.pictureUser = picture.url;
    });
  }

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl("/login");
  }

  /* ---------------------------------------
    * IMAGE
  --------------------------------------- */
  /* convertBlobToUrl(blob: Blob) {
    
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
       this.profileImage = reader.result as string;
    });
    reader.readAsDataURL(blob);
  } */

}
