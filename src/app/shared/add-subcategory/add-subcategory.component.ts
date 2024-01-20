import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent 
implements OnInit {

  @ViewChild('subCategoryNameInput') subCategoryNameInputRef!: ElementRef;

  @Input() subcategories!: any[];
  @Input() categoryName: string | null = null;
  @Input() activeCategory!: any;
  @Input() editingSubCategoryIndex: number | null | undefined;
  @Output() cancelClicked = new EventEmitter<void>();

  isCategoryNameReadonly: boolean = false;

  // select control and api
  selectedCategoryId: any;
  categoryItem: string = '';
  categoryOptions: any;
  categoryList: { id: string; categoryName: string; }[] | undefined;
  isUniquNameShow: boolean = false;
  getCategory() {
    this.apiService.getItemCategoryData(this.activeCategory).subscribe(
      (data) => {
        this.categoryList = data.results;
        this.categoryOptions = this.categoryList?.map(option => option.categoryName);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectCategory(event: any) {
    const selectedCategoryName = event as string;
    const selectedCategory = this.categoryList!.find(category => category.categoryName === selectedCategoryName);

    if (selectedCategory) {
      const selectedCategoryId = selectedCategory.id;
      this.selectedCategoryId = selectedCategory.id;
      this.categoryItem = selectedCategory.categoryName;
    }
  }

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  addSubCategoryForm = this.fb.group({
    categoryTypeId: [''],
    categoryName: [''],
    subCategoryName: ['', [Validators.required, Validators.maxLength(100)]],
  })

  ngOnInit(): void {
    this.getCategory();
    if (this.editingSubCategoryIndex !== null && this.editingSubCategoryIndex !== undefined) {
      if (
        this.editingSubCategoryIndex >= 0 &&
        this.editingSubCategoryIndex < this.subcategories?.length
      ) {
        this.addSubCategoryForm.get('subCategoryName')?.setValue(this.subcategories[this.editingSubCategoryIndex].subCategoryName);
        if (this.categoryName) {
          this.addSubCategoryForm.get('categoryName')?.setValue(this.categoryName);
          this.isCategoryNameReadonly = true;
        }
      }
    }

    setTimeout(() => {
      this.subCategoryNameInputRef.nativeElement.focus();
    }, 600);
  }

  controlClass(controlName: string) {
    return { 'is-invalid': this.addSubCategoryForm?.get(controlName)?.invalid && this.addSubCategoryForm?.get(controlName)?.touched };
  }

  get subCategoryInfo() {
    return this.addSubCategoryForm;
  }

  onSaveSubCategory() {
    if (this.addSubCategoryForm.valid) {
      this.addSubCategoryForm.get('categoryTypeId')?.setValue(this.activeCategory);
      this.apiService.saveSubCategory(this.addSubCategoryForm.value, this.selectedCategoryId).subscribe(
        (response: any) => {
          console.log('Category saved successfully', response);
          this.addSubCategoryForm.reset();
          this.isUniquNameShow = false;
          this.editingSubCategoryIndex = null;
          this.onCancelSubCategory(); 
        },
        (error) => {
          if (error.status == 412) {
            this.isUniquNameShow = true;
            this.editingSubCategoryIndex = null;
            this.addSubCategoryForm.markAllAsTouched();
          }
          console.error('Error saving category', error);
        }
      );
    } else {
      this.addSubCategoryForm.markAllAsTouched();
    }
  }

  onCancelSubCategory() {
    this.cancelClicked.emit();
  }

}
