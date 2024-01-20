import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibraryModule } from '../library/library.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';


@NgModule({
  declarations: [
    AddCategoryComponent,
    AddSubcategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LibraryModule
  ],
  exports:[
    AddCategoryComponent,
    AddSubcategoryComponent
  ]

})
export class SharedModule { }
