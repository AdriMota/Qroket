import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  
  @Input() src: string;
  private imageFile: File;

  constructor(private imageService: ImageService, private authService: AuthService) { }

  onFileSelected(event: Event) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = (e) => {
      this.imageFile = (e.target as HTMLInputElement).files[0];
      this.readImage();
      this.authService.getUser$().subscribe(user => {
        this.uploadImage(user.id);
      });
    }
  }

  readImage() {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.src = reader.result as string;
    }
    
    reader.readAsDataURL(this.imageFile);
  }

  uploadImage(userId: string) {
    const formData = new FormData();
    formData.append('picture', this.imageFile);

    this.imageService.uploadImage(formData, userId).subscribe({
      next: response => console.log('Image uploaded successfully!'),
      error: error => console.log('Error uploading image:', error)
    });
  }
}