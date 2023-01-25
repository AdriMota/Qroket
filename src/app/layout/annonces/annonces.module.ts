import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AnnoncesPageRoutingModule } from './annonces-routing.module';
import { AnnoncesPage } from './annonces.page';
import { SharingModule } from 'src/app/sharing/sharing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnoncesPageRoutingModule,
    SharingModule
  ],
  declarations: [
    AnnoncesPage
  ]
})
export class AnnoncesPageModule {}
