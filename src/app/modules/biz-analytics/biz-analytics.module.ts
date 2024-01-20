import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightsComponent } from './insights/insights.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClickOutsideModule } from 'ng-click-outside';



@NgModule({
  declarations: [
    InsightsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    ClickOutsideModule,
  ]
})
export class BizAnalyticsModule { }
