import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccueilPageRoutingModule } from './accueil-routing.module';
import { AccueilPage } from './accueil.page';
import { CustomButtonComponent } from '../../custom-button/custom-button.component';
import { AnnoncesComponent } from '../../annonces/annonces.component';
import { AddAnimalsComponent } from 'src/app/add-animals/add-animals.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccueilPageRoutingModule
  ],
  declarations: [
    AccueilPage,
    CustomButtonComponent,
    AnnoncesComponent,
    AddAnimalsComponent
  ]
})
export class AccueilPageModule {}
