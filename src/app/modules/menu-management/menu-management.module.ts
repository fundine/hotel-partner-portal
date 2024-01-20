import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuEditorComponent } from './menu-editor/menu-editor.component';
import { QuickAddComponent } from './quick-add/quick-add.component';
import { BatchEntryComponent } from './batch-entry/batch-entry.component';
import { FeaturedGroupComponent } from './featured-group/featured-group.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClickOutsideModule } from 'ng-click-outside';
import { LibraryModule } from 'src/app/library/library.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MenuEditorComponent,
    QuickAddComponent,
    BatchEntryComponent,
    FeaturedGroupComponent,
    CategoryManagementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    ScrollingModule,
    ClickOutsideModule,
    LibraryModule,
    SharedModule
  ]
})
export class MenuManagementModule { }
