import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ImageService } from '../../services/image.service';
import { filter } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  profileImage: string; 
  firstname: string;
  lastname: string;
  locationId: string;
  city: string;

  constructor(private authService: AuthService, private imageService: ImageService, public http: HttpClient) { }

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

  navigate(event: any) {
    console.log(event)
  }

  convertBlobToUrl(blob: Blob) {
    
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
       this.profileImage = reader.result as string;
    });
    reader.readAsDataURL(blob);
  }

}
