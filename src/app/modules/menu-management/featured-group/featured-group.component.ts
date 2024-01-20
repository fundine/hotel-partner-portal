import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-featured-group',
  templateUrl: './featured-group.component.html',
  styleUrls: ['./featured-group.component.scss']
})
export class FeaturedGroupComponent implements OnInit {

  categoryTypeId: string = '';

  loading: boolean = false;
  innerLoading: boolean = false;
  menuItemsLoading: boolean = false;
  alertSuccess: boolean = false;
  featureGroupsList: boolean = true;
  emptyItemDialog: boolean = false;
  deleteConfirmDialog: boolean = false;
  deleteIndex: number | undefined;
  formChangeWarningDialog: boolean = false;
  formChangeDetectedDialog: boolean = false;
  formChangeIdentifiedDialog: boolean = false;
  skeletonCardItems = Array(4).fill(0);
  skeletonMenuItems = Array(4).fill(0);
  quickAddClicked: boolean = false;
  batchEntryClicked: boolean = false;

  isUniquNameShow: boolean = false;
  searchText: string = '';
  selectedItems: any[] = [];

  // feature group api
  featureGroups: any = [];
  getAllRestaurantFeatureGroups() {
    this.innerLoading = true;
    this.apiService.getRestaurantFeatureGroup().subscribe(
      (data) => {
        this.featureGroups = data.results;
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
  getAllBarFeatureGroups() {
    this.innerLoading = true;
    this.apiService.getBarFeatureGroup().subscribe(
      (data) => {
        this.featureGroups = data.results;
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
  triggerFeatureGroupApi() {
    if (this.categoryTypeId.includes('1')) {
      this.getAllRestaurantFeatureGroups();
    }
    else if (this.categoryTypeId.includes('2')) {
      this.getAllBarFeatureGroups();
    }
    else {
      this.getAllRestaurantFeatureGroups();
    }
  }
  // menu items api
  menuItems: any = [];
  getAllRestaurantMenuitems() {
    this.menuItemsLoading = true;
    this.innerLoading = true;
    this.apiService.getRestaurantMenuItems().subscribe(
      (data) => {
        this.menuItems = data.results;
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      },
      () => {
        this.menuItemsLoading = true;
        this.innerLoading = false;
      }
    );
  }
  getAllBarMenuitems() {
    this.menuItemsLoading = true;
    this.innerLoading = true;
    this.apiService.getBarMenuItems().subscribe(
      (data) => {
        this.menuItems = data.results;
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      },
      () => {
        this.menuItemsLoading = false;
        this.innerLoading = false;
      }
    );
  }

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private apiService: ApiService) {

  }

  // feature item form
  featureMenuItemsForm = this.fb.group({
    categoryTypeId: [''],
    itemGroupName: ['', [Validators.required, Validators.maxLength(100), this.duplicateName.bind(this)]],
    items: this.fb.array([])
  })
  controlClass(controlName: string) {
    return { 'is-invalid': this.featureMenuItemsForm?.get(controlName)?.invalid && this.featureMenuItemsForm?.get(controlName)?.touched };
  }
  duplicateName() {
    if (this.isUniquNameShow === true) {
      return { invalidName: true };
    } else {
      return null;
    }
  }
  get itemInfo() {
    return this.featureMenuItemsForm;
  }
  selectCategoryType(categoryTypeId: string): void {
    if (this.categoryTypeId === '1') {
      this.featureMenuItemsForm.reset();
      this.featureMenuItemsForm.get('categoryTypeId')?.setValue('1');

    } else if (this.categoryTypeId === '2') {
      this.featureMenuItemsForm.reset();
      this.featureMenuItemsForm.get('categoryTypeId')?.setValue('2');
    }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryTypeId = params['categoryTypeId'];
    });
    this.selectCategoryType(this.categoryTypeId);
    this.triggerFeatureGroupApi();

    // if (this.isUniquNameShow === true) {
    // this.featureMenuItemsForm.get('itemGroupName')?.valueChanges.subscribe(() => {
    //this.isUniquNameShow = false;
    // });
    //}
  }


  public onItemGroupNameChange(): void {
    if (this.isUniquNameShow === true) {
      this.featureMenuItemsForm.get('itemGroupName')?.valueChanges.subscribe(() => {
        this.isUniquNameShow = false;
        this.duplicateName();
      });
    }
  }

  // general
  addNewFeatureGroup() {
    this.featureGroupsList = false;
    if (this.categoryTypeId.includes('1')) {
      this.getAllRestaurantMenuitems();
    }
    else if (this.categoryTypeId.includes('2')) {
      this.getAllBarMenuitems();
    }
    else {
      this.getAllRestaurantMenuitems();
    }
  }
  cancelAddfeatureGroup() {
    const itemsArray = this.featureMenuItemsForm.get('items') as FormArray;
    if (this.featureMenuItemsForm.dirty || itemsArray.length > 0) {
      this.formChangeIdentifiedDialog = true;
    } else {
      this.searchText = '';
      this.featureMenuItemsForm.reset();
      const itemsArray = this.featureMenuItemsForm.get('items') as FormArray;
      itemsArray.clear();
      this.featureGroupsList = true;
    }
  }
  onBackConfirmClick() {
    this.searchText = '';
    this.isUniquNameShow = false;
    this.featureMenuItemsForm.reset();
    const itemsArray = this.featureMenuItemsForm.get('items') as FormArray;
    itemsArray.clear();
    this.formChangeIdentifiedDialog = false;
    this.triggerFeatureGroupApi();
    this.featureGroupsList = true;
  }
  onAddNewMenuItem() {
    this.onCancelConfirmClick();
  }
  onCancelInfo() {
    this.emptyItemDialog = false;
  }

  // edit feature group
  editFeatureGroup(index: number) {
    console.log('Edit feature group at index:', index);
  }

  // delete feature group
  deleteFeatureGroup(index: number) {
    this.deleteIndex = index;
    this.deleteConfirmDialog = true;
  }
  onConfirmDeleteFeatureGroup() {
    if (this.deleteIndex !== undefined) {
      this.featureGroups.splice(this.deleteIndex, 1);
      this.deleteIndex = undefined;
    }
    this.deleteConfirmDialog = false;
  }
  onCancelDeleteFeatureGroup() {
    this.deleteIndex = undefined;
    this.deleteConfirmDialog = false;
  }

  // search
  matchesSearch(item: any): boolean {
    const searchLower = this.searchText.toLowerCase().trim();
    return item.itemName.toLowerCase().includes(searchLower) ||
      (item.description && item.description.toLowerCase().includes(searchLower));
  }
  clearSearchText() {
    this.searchText = '';
  }
  onItemSelectionChange(index: number) {
    const selectedItem = this.menuItems[index];
    const itemsArray = this.featureMenuItemsForm.get('items') as FormArray;
    const existingIndex = itemsArray.value.findIndex((item: any) => item.itemId === selectedItem.id);
    if (existingIndex !== -1) {
      itemsArray.removeAt(existingIndex);
    } else {
      itemsArray.push(this.fb.control({
        itemId: selectedItem.id,
        itemName: selectedItem.itemName
      }));
    }
  }

  // save feature group
  onSaveFeatureGroup() {
    if (this.featureMenuItemsForm.valid) {
      const itemsArray = this.featureMenuItemsForm.get('items') as FormArray;
      if (itemsArray.length > 0) {
        console.log('Item Info', this.featureMenuItemsForm);
        this.loading = true;
        this.apiService.saveFeatureGroup(this.featureMenuItemsForm.value, this.categoryTypeId).subscribe(
          (response: any) => {
            console.log('feature group saved successfully', response);
            this.isUniquNameShow = false;
            this.featureMenuItemsForm.reset();
            const itemsArray = this.featureMenuItemsForm.get('items') as FormArray;
            itemsArray.clear();
            this.alertSuccess = true;
            this.featureGroupsList = true;
            this.triggerFeatureGroupApi();
          },
          (error) => {
            this.loading = false;
            if (error.status == 412) {
              this.isUniquNameShow = true;
              const itemGroupNameControl = this.featureMenuItemsForm.get('itemGroupName');
              if (itemGroupNameControl) {
                itemGroupNameControl.setValue(itemGroupNameControl.value);
                itemGroupNameControl.updateValueAndValidity();
              }
              this.featureMenuItemsForm.markAllAsTouched();
            }
            console.error('Error saving feature group', error);
          },
          () => {
            this.loading = false;
            this.alertSuccess = true;
          }
        );
      } else {
        this.emptyItemDialog = true;
        return;
      }
    } else {
      this.featureMenuItemsForm.markAllAsTouched();
    }
    this.alertSuccess = false;
  }

  // navigation
  navigateToQuickAdd() {
    const routePath = this.categoryTypeId === '1' ? '/core/menueditor/quickadd' : '/core/menueditor/quickadd';
    this.router.navigate([routePath], { queryParams: { categoryTypeId: this.categoryTypeId } });
  }
  navigateToBatchEntry() {
    const routePath = this.categoryTypeId === '1' ? '/core/menueditor/batchentry' : '/core/menueditor/batchentry';
    this.router.navigate([routePath], { queryParams: { categoryTypeId: this.categoryTypeId } });
  }

  onItemsQuickAdd() {
    const itemsArray = this.featureMenuItemsForm.get('items') as FormArray;
    if (this.featureMenuItemsForm.dirty || itemsArray.length > 0) {
      this.quickAddClicked = true;
      this.formChangeWarningDialog = true;
    } else {
      this.featureMenuItemsForm.reset();
      this.navigateToQuickAdd();
    }
  }
  onItemsBatchEntry() {
    const itemsArray = this.featureMenuItemsForm.get('items') as FormArray;
    if (this.featureMenuItemsForm.dirty || itemsArray.length > 0) {
      this.batchEntryClicked = true;
      this.formChangeWarningDialog = true;
    } else {
      this.featureMenuItemsForm.reset();
      this.navigateToBatchEntry();
    }
  }
  onConfirmClearChanges() {
    this.featureMenuItemsForm.reset();
    this.formChangeWarningDialog = false;

    if (this.quickAddClicked) {
      this.navigateToQuickAdd();
    } else if (this.batchEntryClicked) {
      this.navigateToBatchEntry();
    }
  }
  onCancelClearChanges() {
    this.formChangeWarningDialog = false;
    this.formChangeDetectedDialog = false;
    this.formChangeIdentifiedDialog = false;
    this.batchEntryClicked = false;
    this.quickAddClicked = false;
  }

  // return to home
  onCancelClick() {
    const itemsArray = this.featureMenuItemsForm.get('items') as FormArray;
    if (this.featureMenuItemsForm.dirty || itemsArray.length > 0) {
      this.formChangeDetectedDialog = true;
    } else {
      this.alertSuccess = false;
      this.featureMenuItemsForm.reset();
      this.router.navigate(['/core/menueditor']);
    }
  }
  onCancelConfirmClick() {
    this.alertSuccess = false;
    this.featureMenuItemsForm.reset();
    this.featureMenuItemsForm.reset({ items: [] });
    this.router.navigate(['/core/menueditor']);
  }
}


