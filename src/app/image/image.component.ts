import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { AuthService } from '../auth/auth.service';
import { PictureService } from 'src/app/picture/picture.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  @Input() src: string;
  @ViewChild('fileInput') fileInput;
  private imageFile: File;

  constructor(private imageService: ImageService, private authService: AuthService, private pictureService: PictureService, public http: HttpClient,) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    /* this.imageFile = input.files[0];
    this.readImage(); */


    //const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    //input.onchange = (e) => {
    this.imageFile = input.files[0];
    this.readImage();
    //}
  }

  readImage() {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.src = reader.result as string;
    }

    reader.readAsDataURL(this.imageFile);
  }

  onUploadClick() {
    this.fileInput.nativeElement.click();
    this.authService.getUser$().subscribe(user => {
      const formData = new FormData();
      formData.append('picture', this.imageFile);
      this.imageService.uploadImage(formData, user.id).subscribe({
        next: response => console.log('Image uploaded successfully!'),
        error: error => console.log('Error uploading image:', error)
      });
    });
  }


  /**
    * Gestion de l'upload et l'affichage d'une image
    *
    * L'utilisateur ne peut ajouter qu'une seule photo
    * L'image est stockée sur une API spécialement conçue
    * 
 */

  uploadPicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {

      this.authService.getUser$().subscribe(user => {

        const body = JSON.stringify({ ["picture"]: picture.url });
        this.http.patch(`${environment.apiUrl}users/${user.id}`, body, this.httpOptions)
          .subscribe(
            (response) => {
              console.log('Successful PATCH request: ', response);
            },
            (error) => {
              console.error('Error with PATCH request: ', error);
            }
          );
      });
    });

  }


}