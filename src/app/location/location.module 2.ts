import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationComponent } from './location.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [LocationComponent],
  exports: [LocationComponent]
})
export class LocationComponentModule {}
