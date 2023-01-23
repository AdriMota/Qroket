import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ImageService } from '../../services/image.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  profileImage: string; 

  constructor(private authService: AuthService, private imageService: ImageService) { }

  ngOnInit() {
    this.authService.getUser$().pipe(filter(user => user != null),).subscribe(user => {
      //console.log(user.id)
      this.imageService.getImage(user.id).subscribe(response => {
        //console.log(response);
        const blob = new Blob([response.data.data], { type: 'image/jpeg' });
        this.profileImage = URL.createObjectURL(blob);
        // this.convertBlobToUrl(blob);
      });
    });
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
  
  convertBlobToUrl(blob: Blob) {
    
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
       this.profileImage = reader.result as string;
    });
    reader.readAsDataURL(blob);
  }

}
