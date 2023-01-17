import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComptePageRoutingModule } from './compte-routing.module';
import { ComptePage } from './compte.page';
import { ImageComponent } from '../../image/image.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComptePageRoutingModule
  ],
  declarations: [
    ComptePage,
    ImageComponent
  ]
})
export class ComptePageModule {}
