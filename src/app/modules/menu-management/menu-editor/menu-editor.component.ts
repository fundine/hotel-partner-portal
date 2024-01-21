import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-menu-editor',
  templateUrl: './menu-editor.component.html',
  styleUrls: ['./menu-editor.component.scss']
})
export class MenuEditorComponent implements OnInit {

  // global variables
  public roleId: string = environment.roleId;
  public unitId: string = environment.unitId;
  public categoryTypeId: string[] = environment.categoryTypeId;
  // end global variables

  @ViewChild('rightContainer') rightContainer!: ElementRef;

  loading: boolean = false;
  innerLoading: boolean = false;
  skeletonItems = Array(9).fill(0);
  skeletonCardItems = Array(4).fill(0);
  alertSuccess: boolean = false;
  alertPreview: boolean = false;
  selectedCategoryIndexValue: number | 'undefined' = 0;

  // selectedUnitName: string = '';
  selectedUnitName: string = '';
  selectedUnitIndex: number = 0;
  unitListModal: boolean = false;
  openMenuOptionSelector: boolean = false;

  itemTitle: string | undefined;
  largeImageUrl: string | undefined;
  filterContainer: boolean = false;
  filterButtonSwitch: boolean = false;
  openImagePreview: boolean = false;
  imageDisplay: boolean = true;
  emptyImageItems: boolean = false;
  emptyImageDisplay: boolean = false;
  disabledItems: boolean = false;
  disabledDisplay: boolean = false;
  notAvailableItems: boolean = false;
  notAvailableDisplay: boolean = false;
  bestsellerItems: boolean = false;
  bestsellerDisplay: boolean = false;
  checkItemTypeAll: boolean = false;
  checkItemTypeVeg: boolean = false;
  checkItemTypeNonVeg: boolean = false;

  deleteMode: 'category' | 'subcategory' = 'category';
  selectedItemIndex: number | undefined;
  selectedSubItemIndex: number | undefined;
  selectedCategoryIndex: number | undefined;
  selectedSubCategoryIndex: number | undefined;

  constructor(private router: Router, private fb: FormBuilder, private cdr: ChangeDetectorRef, private apiService: ApiService) { }

  searchQuery: string = '';

  // api
  menuItems: any = [];
  getUnitWiseMenuList(unitId: any) {
    this.innerLoading = true;
    this.apiService.getUnitMenuData(unitId).subscribe(
      (data) => {
        this.menuItems = data.results;
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

  assignedUnits: any = [];
  getAssignedUnitsList() {
    this.innerLoading = true;
    this.apiService.getUnitsList().subscribe(
      (data) => {
        this.assignedUnits = data.results;
        this.selectedUnitName = this.assignedUnits[0].unitName;
        console.log('Assigned Units Data:', data);

        this.unitId = this.assignedUnits[0].unitId;
        this.getUnitWiseMenuList(this.unitId);
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


  ngOnInit(): void {
    this.getAssignedUnitsList();
    if (this.menuItems.length > 0) {
      this.selectedCategoryIndexValue = 0;
      this.scrollRightContainer();
    }
  }

  // unit switching
  onUnitListDisplay() {
    this.unitListModal = true;
  }
  switchUnit(selectedUnit: any, index: number) {
    this.selectedUnitName = selectedUnit.unitName;
    this.selectedUnitIndex = index;
    this.unitId = selectedUnit.unitId;
    this.getUnitWiseMenuList(this.unitId);
  }
  
  getOpenUnitsCount(): number {
    return this.assignedUnits.filter((unit: { isUnitOpen: any; }) => unit.isUnitOpen).length;
  }

  // general
  selectCategory(index: number): void {
    this.selectedCategoryIndexValue = index;
    this.scrollRightContainer();
  }
  scrollRightContainer(): void {
    if (this.selectedCategoryIndexValue !== null && this.rightContainer) {
      const selectedCategoryElement = this.rightContainer.nativeElement.children[this.selectedCategoryIndexValue];
      if (selectedCategoryElement) {
        selectedCategoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // counts
  getCategoryCount(category: any): number {
    let totalCount = 0;
    if (category.items) {
      totalCount += category.items.length;
    }
    if (category.subCategories) {
      for (const subcategory of category.subCategories) {
        if (subcategory.items) {
          totalCount += subcategory.items.length;
        }
      }
    }
    return totalCount;
  }
  totalItemCount(): string {
    let totalCount = 0;
    for (const category of this.menuItems) {
      totalCount += this.getCategoryCount(category);
    }
    return totalCount < 10 ? `0${totalCount}` : `${totalCount}`;
  }
  categoryTotalCount(category: any): string {
    const totalCount = this.getCategoryCount(category);
    return totalCount < 10 ? `0${totalCount}` : `${totalCount}`;
  }
  subcategoryTotalCount(subcategory: any): string {
    const totalCount = subcategory.items ? subcategory.items.length : 0;
    const totalCountString = totalCount < 10 ? `0${totalCount}` : `${totalCount}`;
    return totalCountString;
  }
  categoryVegItemCount(categoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    let vegItemCount = 0;
    if (category.items) {
      vegItemCount += category.items.filter((item: { itemTypeId: string; }) => item.itemTypeId === '1' || item.itemTypeId === '3').length;
    }
    if (category.subCategories) {
      for (const subcategory of category.subCategories) {
        if (subcategory.items) {
          vegItemCount += subcategory.items.filter((item: { itemTypeId: string; }) => item.itemTypeId === '1' || item.itemTypeId === '3').length;
        }
      }
    }
    return vegItemCount;
  }
  subCategoryVegItemCount(categoryIndex: number, subcategoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    if (!category.subCategories || !category.subCategories[subcategoryIndex].items) return 0;

    return category.subCategories[subcategoryIndex].items.filter((item: { itemTypeId: string; }) => item.itemTypeId === '1' || item.itemTypeId === '3').length;
  }
  categoryNonVegItemCount(categoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    let nonVegItemCount = 0;

    if (category.items) {
      nonVegItemCount += category.items.filter((item: { itemTypeId: string; }) => item.itemTypeId === '2' || item.itemTypeId === '3').length;
    }

    if (category.subCategories) {
      for (const subcategory of category.subCategories) {
        if (subcategory.items) {
          nonVegItemCount += subcategory.items.filter((item: { itemTypeId: string; }) => item.itemTypeId === '2' || item.itemTypeId === '3').length;
        }
      }
    }

    return nonVegItemCount;
  }
  subCategoryNonVegItemCount(categoryIndex: number, subcategoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    if (!category.subCategories || !category.subCategories[subcategoryIndex].items) return 0;

    return category.subCategories[subcategoryIndex].items.filter((item: { itemTypeId: string; }) => item.itemTypeId === '2' || item.itemTypeId === '3').length;
  }
  categoryNotAvailableItemCount(categoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    let notAvailableItemCount = 0;
    if (category.items) {
      notAvailableItemCount += category.items.filter((item: { isAvailable: boolean }) => !item.isAvailable).length;
    }
    if (category.subCategories) {
      for (const subcategory of category.subCategories) {
        if (subcategory.items) {
          notAvailableItemCount += subcategory.items.filter((item: { isAvailable: boolean }) => !item.isAvailable).length;
        }
      }
    }
    return notAvailableItemCount;
  }
  subCategoryNotAvailableItemCount(categoryIndex: number, subcategoryIndex: number): number {
    const category = this.menuItems[categoryIndex];

    if (!category.subCategories || !category.subCategories[subcategoryIndex].items) return 0;

    const notAvailableItemCount = category.subCategories[subcategoryIndex].items.filter((item: { isAvailable: boolean }) => !item.isAvailable).length;
    return notAvailableItemCount;
  }
  totalNotAvailableItemCount(): number {
    let totalNotAvailableItems = 0;
    for (let categoryIndex = 0; categoryIndex < this.menuItems.length; categoryIndex++) {
      const category = this.menuItems[categoryIndex];
      if (category.items) {
        totalNotAvailableItems += category.items.filter((item: { isAvailable: boolean }) => !item.isAvailable).length;
      }
      if (category.subCategories) {
        for (let subcategoryIndex = 0; subcategoryIndex < category.subCategories.length; subcategoryIndex++) {
          const subcategory = category.subCategories[subcategoryIndex];
          if (subcategory.items) {
            totalNotAvailableItems += subcategory.items.filter((item: { isAvailable: boolean }) => !item.isAvailable).length;
          }
        }
      }
    }
    return totalNotAvailableItems;
  }
  categoryDisabledItemCount(categoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    let disabledItemCount = 0;
    if (category.items) {
      disabledItemCount += category.items.filter((item: { isDisabled: boolean }) => item.isDisabled === true).length;
    }
    if (category.subCategories) {
      for (const subcategory of category.subCategories) {
        if (subcategory.items) {
          disabledItemCount += subcategory.items.filter((item: { isDisabled: boolean }) => item.isDisabled === true).length;
        }
      }
    }
    return disabledItemCount;
  }
  subCategoryDisabledItemCount(categoryIndex: number, subcategoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    if (!category.subCategories || !category.subCategories[subcategoryIndex].items) return 0;
    const disabledItemCount = category.subCategories[subcategoryIndex].items.filter((item: { isDisabled: boolean }) => item.isDisabled === true).length;
    return disabledItemCount;
  }
  totalDisabledItemCount(): number {
    let totalDisabledItems = 0;
    for (let categoryIndex = 0; categoryIndex < this.menuItems.length; categoryIndex++) {
      const category = this.menuItems[categoryIndex];
      if (category.items) {
        totalDisabledItems += category.items.filter((item: { isDisabled: boolean }) => item.isDisabled === true).length;
      }
      if (category.subCategories) {
        for (let subcategoryIndex = 0; subcategoryIndex < category.subCategories.length; subcategoryIndex++) {
          const subcategory = category.subCategories[subcategoryIndex];
          if (subcategory.items) {
            totalDisabledItems += subcategory.items.filter((item: { isDisabled: boolean }) => item.isDisabled === true).length;
          }
        }
      }
    }
    return totalDisabledItems;
  }
  categoryBestSellerItemCount(categoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    let bestSellerItemCount = 0;
    if (category.items) {
      bestSellerItemCount += category.items.filter((item: { isBestSeller: boolean }) => item.isBestSeller === true).length;
    }
    if (category.subCategories) {
      for (const subcategory of category.subCategories) {
        if (subcategory.items) {
          bestSellerItemCount += subcategory.items.filter((item: { isBestSeller: boolean }) => item.isBestSeller === true).length;
        }
      }
    }
    return bestSellerItemCount;
  }
  subCategoryBestSellerItemCount(categoryIndex: number, subcategoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    if (!category.subCategories || !category.subCategories[subcategoryIndex].items) return 0;

    const bestSellerItemCount = category.subCategories[subcategoryIndex].items.filter((item: { isBestSeller: boolean }) => item.isBestSeller === true).length;
    return bestSellerItemCount;
  }
  totalBestsellerItemCount(): number {
    let totalCount = 0;
    for (let categoryIndex = 0; categoryIndex < this.menuItems.length; categoryIndex++) {
      const category = this.menuItems[categoryIndex];
      if (category.items) {
        totalCount += category.items.filter((item: { isBestSeller: boolean }) => item.isBestSeller).length;
      }
      if (category.subCategories) {
        for (let subcategoryIndex = 0; subcategoryIndex < category.subCategories.length; subcategoryIndex++) {
          const subcategory = category.subCategories[subcategoryIndex];
          if (subcategory.items) {
            totalCount += subcategory.items.filter((item: { isBestSeller: boolean }) => item.isBestSeller).length;
          }
        }
      }
    }
    return totalCount;
  }
  categoryEmptyImageUrlItemCount(categoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    let emptyImageUrlItemCount = 0;
    if (category.items) {
      emptyImageUrlItemCount += category.items.filter((item: { imageUrl: string }) => !item.imageUrl || item.imageUrl.trim() === '').length;
    }
    if (category.subCategories) {
      for (const subcategory of category.subCategories) {
        if (subcategory.items) {
          emptyImageUrlItemCount += subcategory.items.filter((item: { imageUrl: string }) => !item.imageUrl || item.imageUrl.trim() === '').length;
        }
      }
    }
    console.log(`Category ${categoryIndex} - Empty Image URL Item Count: ${emptyImageUrlItemCount}`);
    return emptyImageUrlItemCount;
  }
  subCategoryEmptyImageUrlItemCount(categoryIndex: number, subcategoryIndex: number): number {
    const category = this.menuItems[categoryIndex];
    if (!category.subCategories || !category.subCategories[subcategoryIndex].items) return 0;
    const emptyImageUrlItemCount = category.subCategories[subcategoryIndex].items.filter((item: { imageUrl: string }) => !item.imageUrl || item.imageUrl.trim() === '').length;
    console.log(`Category ${categoryIndex}, Subcategory ${subcategoryIndex} - Empty Image URL Item Count: ${emptyImageUrlItemCount}`);
    return emptyImageUrlItemCount;
  }
  totalEmptyImageUrlItemCount(): number {
    let totalEmptyImageUrlItems = 0;
    for (let categoryIndex = 0; categoryIndex < this.menuItems.length; categoryIndex++) {
      const category = this.menuItems[categoryIndex];
      if (category.items) {
        totalEmptyImageUrlItems += category.items.filter((item: { imageUrl: string }) => !item.imageUrl || item.imageUrl.trim() === '').length;
      }
      if (category.subCategories) {
        for (let subcategoryIndex = 0; subcategoryIndex < category.subCategories.length; subcategoryIndex++) {
          const subcategory = category.subCategories[subcategoryIndex];
          if (subcategory.items) {
            totalEmptyImageUrlItems += subcategory.items.filter((item: { imageUrl: string }) => !item.imageUrl || item.imageUrl.trim() === '').length;
          }
        }
      }
    }
    return totalEmptyImageUrlItems;
  }

  // filter controls
  onShowFilters() {
    this.filterContainer = true;
  }
  onHideFilters() {
    this.filterContainer = false;
    this.filterButtonSwitch = false;
    // this.imageDisplay = true;
    this.notAvailableItems = false;
    this.notAvailableDisplay = false;
    this.disabledItems = false;
    this.disabledDisplay = false;
    this.bestsellerItems = false;
    this.bestsellerDisplay = false;
    this.emptyImageItems = false;
    this.emptyImageDisplay = false;
  }
  onVegCheckboxChange(): void {
    this.checkItemTypeAll = false;
    this.cdr.detectChanges();
  }
  onNonVegCheckboxChange(): void {
    this.checkItemTypeAll = false;
    this.cdr.detectChanges();
  }
  onCheckboxChange(itemTypeId: string): void {
    this.checkItemTypeAll = false;
    if (itemTypeId === '1' || itemTypeId === '3') {
      this.checkItemTypeVeg = !this.checkItemTypeVeg;
      if (this.checkItemTypeVeg && this.checkItemTypeNonVeg) {
        this.checkItemTypeNonVeg = false;
      }
    } else if (itemTypeId === '2' || itemTypeId === '3') {
      this.checkItemTypeNonVeg = !this.checkItemTypeNonVeg;
      if (this.checkItemTypeNonVeg && this.checkItemTypeVeg) {
        this.checkItemTypeVeg = false;
      }
    }
    this.cdr.detectChanges();
  }
  onShowImage() {
    this.imageDisplay = !this.imageDisplay;
  }
  onShowNotAvailableItems() {
    this.notAvailableItems = !this.notAvailableItems;
    this.notAvailableDisplay = !this.notAvailableDisplay;
    this.disabledItems = false;
    this.disabledDisplay = false;
    this.bestsellerItems = false;
    this.bestsellerDisplay = false;
  }
  onShowDisabledItems() {
    this.disabledItems = !this.disabledItems;
    this.disabledDisplay = !this.disabledDisplay;
    this.notAvailableItems = false;
    this.notAvailableDisplay = false;
    this.bestsellerItems = false;
    this.bestsellerDisplay = false;
  }
  onShowBestsellerItems() {
    this.bestsellerItems = !this.bestsellerItems;
    this.bestsellerDisplay = !this.bestsellerDisplay;
    this.notAvailableItems = false;
    this.notAvailableDisplay = false;
    this.disabledItems = false;
    this.disabledDisplay = false;
  }
  onShowEmptyImageItems() {
    this.emptyImageItems = !this.emptyImageItems;
    this.emptyImageDisplay = !this.emptyImageDisplay;
  }
  onShowOutofStockItems() {
    this.filterContainer = true;
    this.filterButtonSwitch = true;
    this.onShowNotAvailableItems();
  }
  onShowAllMenuItems() {
    this.filterButtonSwitch = false;
    this.onHideFilters();
  }

  // search menu item
  get filteredMenuItems() {
    if (this.searchQuery.length < 1) {
      return [];
    }
    return this.menuItems
      .map((category: { items: any[]; subCategories: any[]; }) => {
        return {
          ...category,
          items: category.items ? category.items.filter(item => item.itemName.toLowerCase().includes(this.searchQuery.toLowerCase())) : [],
          subCategories: category.subCategories ? category.subCategories.map(subcategory => ({
            ...subcategory,
            items: subcategory.items.filter((item: { itemName: string; }) => item.itemName.toLowerCase().includes(this.searchQuery.toLowerCase()))
          })) : [],
        };
      });
  }
  clearSearchText() {
    this.searchQuery = '';
  }

  // image preview
  handleImageClick(itemName: string, imageUrl: string): void {
    if (!imageUrl) {
      setTimeout(() => {
        this.alertPreview = true;
      }, 0);
      this.alertPreview = false;
    } else {
      this.openModal(itemName, imageUrl);
    }
  }
  openModal(itemName: string, imageUrl: string): void {
    this.itemTitle = itemName;
    this.largeImageUrl = imageUrl;
    this.openImagePreview = true;
  }
  onModalClosed() {
    this.openImagePreview = false;
    this.unitListModal = false;
    this.openMenuOptionSelector = false;
  }

  // edit item
  onEditCategoryItem(categoryIndex: number, itemIndex: number): void { }
  onEditSubCategoryItem(categoryIndex: number, subcategoryIndex: number, subItemIndex: number): void { }

  // delete category item
  requestDeleteCategoryItem(categoryIndex: number, itemIndex: number | undefined) {
    this.deleteMode = 'category';
    this.selectedCategoryIndex = categoryIndex;
    this.selectedItemIndex = itemIndex;
  }
  onConfirmDeleteCategoryItem(categoryIndex: number, itemIndex: number | undefined): void {
    if (itemIndex !== undefined) {
      this.menuItems[categoryIndex].items.splice(itemIndex, 1);
    }
    this.selectedCategoryIndex = undefined;
    this.selectedItemIndex = undefined;
  }
  onCancelDeleteCategoryItem() {
    this.selectedCategoryIndex = undefined;
  }

  // delete sub category item
  requestDeleteSubcategoryItem(categoryIndex: number, subcategoryIndex: number, subItemIndex: number | undefined): void {
    this.deleteMode = 'subcategory';
    this.selectedCategoryIndex = categoryIndex;
    this.selectedSubCategoryIndex = subcategoryIndex;
    this.selectedSubItemIndex = subItemIndex;
  }
  onConfirmDeleteSubCategoryItem(categoryIndex: number, subcategoryIndex: number, subItemIndex: number | undefined): void {
    if (subItemIndex !== undefined) {
      const subcategory = this.menuItems[categoryIndex].subCategories[subcategoryIndex];
      subcategory.items.splice(subItemIndex, 1);
    }
    this.selectedCategoryIndex = undefined;
    this.selectedSubCategoryIndex = undefined;
    this.selectedSubItemIndex = undefined;
  }
  onCancelDeleteSubCategoryItem() {
    this.selectedCategoryIndex = undefined;
    this.selectedSubCategoryIndex = undefined;
  }

  // add new menu item
  onAddNewMenuItem() {
    this.openMenuOptionSelector = true;
  }

  addNewRestaurantMenu() {
    const categoryTypeId = '1';
    this.router.navigate(['/core/menueditor/quickadd'], { queryParams: { categoryTypeId } });
  }
  addNewBarMenu() {
    const categoryTypeId = '2';
    this.router.navigate(['/core/menueditor/quickadd'], { queryParams: { categoryTypeId } });
  }
  addNewLaundryMenu() {
    const categoryTypeId = '3';
    this.router.navigate(['/core/menueditor/quickadd'], { queryParams: { categoryTypeId } });
  }
  addNewSpaMenu() {
    const categoryTypeId = '4';
    this.router.navigate(['/core/menueditor/quickadd'], { queryParams: { categoryTypeId } });
  }
}
