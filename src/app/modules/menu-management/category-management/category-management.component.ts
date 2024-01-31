import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {

  // global variables
  public roleCode: string = environment.roleCode;
  public categoryTypeId: string[] = environment.categoryTypeId;
  // end global variables

  // @Output() cancelClicked = new EventEmitter<void>();

  innerLoading: boolean = false;
  loading: boolean = false;
  alertSuccess: boolean = false;
  activeCategory: string = '1';

  categories: any = [];
  openCategoryModal = false;
  skeletonCardItems = Array(3).fill(0);
  isEditingCategory: boolean = false;
  isEditingSubCategory: boolean = false;
  selectedOption: string = 'category';
  deleteMode: 'category' | 'subcategory' = 'category';
  selectedCategoryIndex: number | undefined;
  selectedSubCategoryIndex: number | undefined;
  editingCategoryIndex: number | null = null;
  editingSubCategoryIndex!: number | null;

  // api 
  getCategoryList(activeCategory: string) {
    this.innerLoading = true;
    this.apiService.getCategoryData(activeCategory).subscribe(
      (data) => {
        this.categories = data.results;
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      },
      () => {
        this.innerLoading = false;
      }
    );
  }

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getCategoryList(this.activeCategory);
  }

  selectCategoryType(categoryTypeId: string): void {
    this.activeCategory = categoryTypeId;
    this.getCategoryList(this.activeCategory);
  }

  // add new category
  onCreateCategorgyNew() {
    this.openCategoryModal = true;
  }
  onRadioChange(option: string) {
    this.selectedOption = option;
  }

  // edit category
  editCategory(index: number) {
    this.selectedOption = "category";
    this.isEditingCategory = true;
    this.isEditingSubCategory = false;
    this.editingCategoryIndex = index;
    this.openCategoryModal = true;
  }

  // delete category
  requestDeleteCategory(index: number) {
    this.deleteMode = 'category';
    this.selectedCategoryIndex = index;
  }
  onConfirmDeleteCategory(index: number) {
    const deletedCategoryId = this.categories[index].id;
    this.apiService.deleteCategory(deletedCategoryId).subscribe(
      () => {
        this.selectedCategoryIndex = undefined;
        this.getCategoryList(this.activeCategory);
        console.log('Category deleted successfully.');
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }
  onCancelDeleteCategory() {
    this.selectedCategoryIndex = undefined;
  }

  // edit sub-category
  editSubcategory(categoryIndex: number, subcategoryIndex: number) {
    this.selectedOption = "sub-category";
    this.isEditingSubCategory = true;
    this.isEditingCategory = false;
    this.editingCategoryIndex = categoryIndex;
    this.editingSubCategoryIndex = subcategoryIndex;
    this.openCategoryModal = true;
  }

  // delete sub-category
  requestDeleteSubcategory(categoryIndex: number, subcategoryIndex: number) {
    this.deleteMode = 'subcategory';
    this.selectedCategoryIndex = categoryIndex;
    this.selectedSubCategoryIndex = subcategoryIndex;
  }
  onConfirmDeleteSubCategory(categoryIndex: number, subcategoryIndex: number) {
    if (categoryIndex !== undefined && subcategoryIndex !== undefined) {
      if (categoryIndex >= 0 && categoryIndex < this.categories.length) {
        const categoryId = this.categories[categoryIndex].id;
        if (categoryId) {
          const subcategory = this.categories[categoryIndex].subcategory;

          if (subcategory && subcategoryIndex >= 0 && subcategoryIndex < subcategory.length) {
            const subCategoryId = subcategory[subcategoryIndex].id;

            if (subCategoryId) {
              this.apiService.deleteSubCategory(categoryId, subCategoryId).subscribe(
                () => {
                  this.selectedCategoryIndex = undefined;
                  this.selectedSubCategoryIndex = undefined;
                  this.getCategoryList(this.activeCategory);
                  console.log('Subcategory deleted successfully.');
                },
                (error) => {
                  console.error('Error deleting subcategory:', error);
                }
              );
            }
          }
        }
      }
    }
  }
  onCancelDeleteSubCategory() {
    this.selectedCategoryIndex = undefined;
    this.selectedSubCategoryIndex = undefined;
  }
  onModalClosed() {
    this.editingCategoryIndex = null;
    this.openCategoryModal = false;
    this.editingSubCategoryIndex = null;
    this.isEditingCategory = false;
    this.isEditingSubCategory = false;
  }
  onCancelClicked() {
    this.editingCategoryIndex = null;
    this.openCategoryModal = false;
    this.editingSubCategoryIndex = null;
    this.isEditingCategory = false;
    this.isEditingSubCategory = false;
    this.getCategoryList(this.activeCategory);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
  }
  onSubcategoryDrop(parentIndex: number, event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories[parentIndex].subcategory, event.previousIndex, event.currentIndex);
  }

  // save 
  onSaveCategoryChanges() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.alertSuccess = true;
    }, 2000);
    this.alertSuccess = false;
  }

  // return to home
  onCancelClick() {
    this.loading = false;
    this.innerLoading = false;
    this.alertSuccess = false;
  }

}

