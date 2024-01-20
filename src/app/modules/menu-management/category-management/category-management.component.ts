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
  public categoryTypeId: string[] = environment.categoryTypeId;
  public roleId: string = environment.roleId;
  // end global variables

  //@Output() cancelClicked = new EventEmitter<void>();

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
  getRestaurantCategory() {
    this.innerLoading = true;
    this.apiService.getRestaurantCategoryData().subscribe(
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
  getBarCategory() {
    this.innerLoading = true;
    this.apiService.getBarCategoryData().subscribe(
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
  getLaundryCategory() {
    this.innerLoading = true;
    this.apiService.getLaundryCategoryData().subscribe(
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
  getSpaCategory() {
    this.innerLoading = true;
    this.apiService.getSpaCategoryData().subscribe(
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
    if (this.categoryTypeId.includes('1')) {
      this.getRestaurantCategory();
      this.activeCategory = '1';
    } else if (this.categoryTypeId.includes('2')) {
      this.getBarCategory();
      this.activeCategory = '2';
    } else if (this.categoryTypeId.includes('3')) {
      this.getLaundryCategory();
      this.activeCategory = '3';
    } else if (this.categoryTypeId.includes('4')) {
      this.getSpaCategory();
      this.activeCategory = '4';
    } else {
      this.getRestaurantCategory();
    }
  }

  selectCategoryType(categoryTypeId: string): void {
    this.activeCategory = categoryTypeId;
    if (categoryTypeId === '1') {
      this.getRestaurantCategory();
      this.activeCategory = '1';
    } else if (categoryTypeId === '2') {
      this.getBarCategory();
      this.activeCategory = '2';
    } else if (categoryTypeId === '3') {
      this.getLaundryCategory();
      this.activeCategory = '3';
    } else if (categoryTypeId === '4') {
      this.getSpaCategory();
      this.activeCategory = '4';
    }
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
    this.categories.splice(index, 1);
    this.selectedCategoryIndex = undefined;
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
        const subcategory = this.categories[categoryIndex].subcategory;
        if (subcategory && subcategoryIndex >= 0 && subcategoryIndex < subcategory.length) {
          subcategory.splice(subcategoryIndex, 1);
        }
      }
    }
    this.selectedCategoryIndex = undefined;
    this.selectedSubCategoryIndex = undefined;
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
    if (this.activeCategory === '1') {
      this.getRestaurantCategory();
    } else if (this.activeCategory === '2') {
      this.getBarCategory();
    } else if (this.activeCategory === '3') {
      this.getLaundryCategory();
    } else if (this.activeCategory === '4') {
      this.getSpaCategory();
    }
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

