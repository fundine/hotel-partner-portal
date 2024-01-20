import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

import { DialogComponent } from './dialog/dialog.component';
import { ModalComponent } from './modal/modal.component';
import { SelectControlComponent } from './select-control/select-control.component';
import { MultiSelectControlComponent } from './multi-select-control/multi-select-control.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToasterComponent } from './toaster/toaster.component';

@NgModule({
  declarations: [
    DialogComponent,
    ModalComponent,   
    SelectControlComponent,     
    MultiSelectControlComponent,
    SpinnerComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClickOutsideModule,
  ],
  exports: [
    DialogComponent,
    ModalComponent,
    SelectControlComponent, 
    MultiSelectControlComponent,
    ToasterComponent,
    SpinnerComponent
  ]
})
export class LibraryModule { }
