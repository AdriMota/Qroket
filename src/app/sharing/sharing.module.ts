import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AddAnimalsComponent } from '../add-animals/add-animals.component';
import { AnnoncesComponent } from '../annonces/annonces.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { AddAnimalComponent } from '../modals/add-animal/add-animal.component';
import { InfosComponent } from '../infos/infos.component';
import { UpdateAnimalComponent } from '../modals/update-animal/update-animal.component';


@NgModule({
  declarations: [
    AddAnimalsComponent,
    CustomButtonComponent,
    AnnoncesComponent,
    AddAnimalComponent,
    InfosComponent,
    UpdateAnimalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    AddAnimalsComponent,
    CustomButtonComponent,
    AnnoncesComponent,
    AddAnimalComponent,
    InfosComponent,
    UpdateAnimalComponent
  ]
})
export class SharingModule { }
