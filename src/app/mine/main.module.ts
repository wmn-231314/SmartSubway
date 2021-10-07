import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MinePage } from './mine.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MinePageRoutingModule } from './mine-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: MinePage }]),
    MinePageRoutingModule,
  ],
  declarations: [MinePage]
})
export class MinePageModule {}
