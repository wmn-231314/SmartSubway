import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MytripPage } from './mytrip.page';

const routes: Routes = [
  {
    path: '',
    component: MytripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MytripPageRoutingModule {}
