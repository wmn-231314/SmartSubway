import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaystylePage } from './paystyle.page';

const routes: Routes = [
  {
    path: '',
    component: PaystylePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaystylePageRoutingModule {}
