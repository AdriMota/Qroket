import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

  @Input() src: string;
  private imageFile: File;

  constructor() { }

  ngOnInit() { }

  /* selectImage() {
    // Code pour permettre à l'utilisateur de sélectionner une image
    
  } */

  onFileSelected(event: Event) {
    /* const file = (event.target as HTMLInputElement).files[0];
    this.src = URL.createObjectURL(file); */

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files[0];
        this.imageFile = file;
        this.readImage();
    }
  }

  readImage() {
    const reader = new FileReader();
    reader.onload = (e) => {
        this.src = reader.result as string;
    }
    reader.readAsDataURL(this.imageFile);
  }
}
