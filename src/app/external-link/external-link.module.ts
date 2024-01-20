import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalLinkRoutingModule } from './external-link-routing.module';
import { ExternalLinkComponent } from './external-link.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderFeedbackComponent } from './order-feedback/order-feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ExternalLinkComponent,
    OrderDetailComponent,
    OrderFeedbackComponent
  ],
  imports: [
    CommonModule,
    ExternalLinkRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ExternalLinkModule { }
