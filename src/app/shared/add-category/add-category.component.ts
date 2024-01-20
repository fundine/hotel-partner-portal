import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @ViewChild('categoryNameInput') categoryNameInputRef!: ElementRef;
  @Input() categories!: any[];
  @Input() activeCategory!: any;
  @Input() editingCategoryIndex: number | null = null;
  @Output() cancelClicked = new EventEmitter<void>();
  isUniquNameShow: boolean = false;
  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  addCategoryForm = this.fb.group({
    categoryTypeId: [''],
    categoryName: ['', [Validators.required, Validators.maxLength(100)]],
  })

  ngOnInit(): void {
    if (this.editingCategoryIndex !== null && this.categories && this.editingCategoryIndex >= 0 && this.editingCategoryIndex < this.categories.length) {
      this.addCategoryForm.get('categoryName')?.setValue(this.categories[this.editingCategoryIndex].categoryName);
    }
    setTimeout(() => {
      this.categoryNameInputRef.nativeElement.focus();
    }, 600);
  }

  controlClass(controlName: string) {
    return { 'is-invalid': this.addCategoryForm?.get(controlName)?.invalid && this.addCategoryForm?.get(controlName)?.touched };
  }

  get categoryInfo() {
    return this.addCategoryForm;
  }

  onSaveCategory() {
    if (this.addCategoryForm.valid) {
      this.addCategoryForm.get('categoryTypeId')?.setValue(this.activeCategory);
      this.apiService.saveCategory(this.addCategoryForm.value).subscribe(
        (response: any) => {
          console.log('Category saved successfully', response);
          this.addCategoryForm.reset();
          this.isUniquNameShow = false;
          this.editingCategoryIndex = null;
          this.onCancelCategory();
        },
        (error) => {
          if (error.status == 412) {
            this.isUniquNameShow = true;
            this.editingCategoryIndex = null;
            this.addCategoryForm.markAllAsTouched();
          }

          console.error('Error saving category', error);
        }
      );
    } else {
      this.addCategoryForm.markAllAsTouched();
    }
  }

  onCancelCategory() {
    this.cancelClicked.emit(this.activeCategory);
  }
}

