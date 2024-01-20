import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderFeedbackComponent } from './order-feedback/order-feedback.component';

const routes: Routes = [
  { path: '', redirectTo: 'order/orderdetail', pathMatch: 'full' },
  { path: 'order/orderdetail', component: OrderDetailComponent },
  { path: 'order/orderfeedback', component: OrderFeedbackComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalLinkRoutingModule { }
