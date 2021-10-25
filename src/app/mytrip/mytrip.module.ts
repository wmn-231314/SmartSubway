import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MytripPageRoutingModule } from './mytrip-routing.module';

import { MytripPage } from './mytrip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MytripPageRoutingModule
  ],
  declarations: [MytripPage]
})
export class MytripPageModule {}
