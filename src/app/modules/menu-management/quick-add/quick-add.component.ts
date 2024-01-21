import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.scss']
})
export class QuickAddComponent implements OnInit {


  categoryTypeId: string = '';
  loading: boolean = false;
  alertSuccess: boolean = false;
  isUniquNameShow: boolean = false;
  formChangeWarningDialog: boolean = false;
  formChangeDetectedDialog: boolean = false;
  batchEntryClicked: boolean = false;
  featuredGroupClicked: boolean = false;
  selectedImage: string | ArrayBuffer | null = null;
  selectedOption: string = 'cafe';
  itemPriceInfo: any = [];
  outletFormArrayMap: Map<any, FormGroup> = new Map<any, FormGroup>(); 

  // select control and api
  selectedCategoryId: any;
  categoryItem: string = '';
  categoryOptions: any;
  categoryList: { id: string; categoryName: string; }[] | undefined;
  selectedOutlets: any;
  
  getCategory() {
    const id = this.route.snapshot.queryParams['categoryTypeId'];
    this.apiService.getItemCategoryData(id).subscribe(
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
      this.getSubCategory(selectedCategoryId)
      this.selectedCategoryId = selectedCategory.id;
      this.categoryItem = selectedCategory.categoryName;
    }
  }

  selectedSubCategoryId: any;
  subCategoryItem: string = '';
  subCategoryOptions: any;
  subCategoryList: { id: string; subCategoryName: string }[] | undefined;
  getSubCategory(categoryId: any) {
    this.apiService.getItemSubCategoryData(categoryId).subscribe(response => {
      this.subCategoryList = response.results;
      this.subCategoryOptions = this.subCategoryList?.map(option => option.subCategoryName);
      console.log(response);
    }, error => {
      console.error('Error fetching data:', error);
    });
  }
  selectSubCategory(event: any) {
    const selectedSubCategoryName = event as string;
    const selectedSubCategoryItem = this.subCategoryList!.find(item => item.subCategoryName === selectedSubCategoryName);

    if (selectedSubCategoryItem) {
      this.selectedSubCategoryId = selectedSubCategoryItem.id;
      this.subCategoryItem = selectedSubCategoryItem.subCategoryName;
    }
  }

  selectedTypeId: any;
  itemTypeItem: string = '';
  itemTypeOptions: any;
  itemTypeList: { id: string; itemTypeName: string }[] | undefined;
  getItemType() {
    this.apiService.getItemTypeData().subscribe(
      (data) => {
        this.itemTypeList = data.results;
        this.itemTypeOptions = this.itemTypeList!.map(option => option.itemTypeName);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectItemType(event: any) {
    const selectedTypeName = event as string;
    const selectedTypeItem = this.itemTypeList!.find(item => item.itemTypeName === selectedTypeName);

    if (selectedTypeItem) {
      this.selectedTypeId = selectedTypeItem.id;
      this.itemTypeItem = selectedTypeItem.itemTypeName;
    }
  }

  selectedUnitId: any;
  itemUnitItem: any[] = [];
  itemUnitOptions: any;
  itemUnitList: { unitId: string; unitName: string; unitTypeName: string }[] | undefined;
  getAllUnits(categoryTypeId: any) {
    this.apiService.getUnitListData(categoryTypeId).subscribe(
      (data) => {
        this.itemUnitList = data.results;
        this.itemUnitOptions = this.itemUnitList!.map(option => option.unitName);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // selectUnitType(event: any) {
  //   const selectedUnitName = event as string;
  //   const selectedUnitItem = this.itemUnitList!.find(item => item.unitName === selectedUnitName);

  //   if (selectedUnitItem) {
  //     this.selectedUnitId = selectedUnitItem.unitId;
  //     this.itemUnitItem = selectedUnitItem.unitName;
  //   }
  // }

  selectUnitType(event: any) {
    const selectedUnitName = event as string;
    const selectedUnitItem = this.itemUnitList!.find(item => item.unitName === selectedUnitName);

    if (selectedUnitItem) {
      this.selectedUnitId = selectedUnitItem.unitId;
      this.itemUnitItem.push(selectedUnitItem.unitName);
    }
  }

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.itemQuickAddForm.get('categoryName')?.valueChanges.subscribe(() => {
      this.itemQuickAddForm.get('subCategoryName')?.setValue('');
    });
  }

  // quick add form
  itemQuickAddForm = this.fb.group({
    categoryTypeId: [''],
    imageUrl: [null],
    itemName: ['', [Validators.required, Validators.maxLength(100)]],
    itemTypeId: [''],
    itemTypeName: ['', [Validators.required]],


    // allowedOutlets: [[], [Validators.required]],
    allowedOutletsId: [this.fb.array([]), [Validators.required]],
    allowedOutlets: [this.fb.array([]), [Validators.required]],


    categoryId: [''],
    categoryName: ['', [Validators.required]],
    subCategoryId: [''],
    subCategoryName: [''],
    description: ['', [Validators.maxLength(500)]],

    differentPricing: [false],

    // itemPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
    // itemTax: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?%?$/)]],
    // itemFinalPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],

    itemPriceArray: this.fb.array([]),

    isAvailable: [true],
    isDisplayInMenu: [true],
    isBestSeller: [false],
    isDisabled: [false],
  })

  // addNewPriceItem(defaultItemCount: number = 1) {
  //   this.itemPriceInfo = this.priceInfoArray;
  //   for (let i = 0; i < defaultItemCount; i++) {
  //     const newItemPrice = this.fb.group({
  //       itemPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
  //       itemTax: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?%?$/)]],
  //       itemFinalPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
  //     });
  //     this.itemPriceInfo.push(newItemPrice);
  //   }
  // }
  get priceInfoArray() {
    return this.itemQuickAddForm.get('itemPriceArray') as FormArray;
  }

  controlClass(controlName: string) {
    return { 'is-invalid': this.itemQuickAddForm?.get(controlName)?.invalid && this.itemQuickAddForm?.get(controlName)?.touched };
  }
  get itemInfo() {
    return this.itemQuickAddForm;
  }
  // selectCategoryType(categoryTypeId: string): void {
  //   if (this.categoryTypeId === '1') {
  //     this.itemQuickAddForm.reset();
  //     this.itemQuickAddForm.get('categoryTypeId')?.setValue('1');
  //     this.itemQuickAddForm.get('differentPricing')?.setValue(false);
  //     this.itemQuickAddForm.get('isAvailable')?.setValue(true);
  //     this.itemQuickAddForm.get('isDisplayInMenu')?.setValue(true);
  //     this.itemQuickAddForm.get('isBestSeller')?.setValue(false);
  //     this.itemQuickAddForm.get('isDisabled')?.setValue(false);

  //   } else if (this.categoryTypeId === '2') {
  //     this.itemQuickAddForm.reset();
  //     this.selectedTypeId = '4';
  //     this.itemTypeItem = 'None';
  //     this.itemQuickAddForm.get('categoryTypeId')?.setValue('2');
  //     this.itemQuickAddForm.get('itemTypeId')?.setValue(this.selectedTypeId);
  //     this.itemQuickAddForm.get('itemTypeName')?.setValue(this.itemTypeItem);
  //     this.itemQuickAddForm.get('differentPricing')?.setValue(false);
  //     this.itemQuickAddForm.get('isAvailable')?.setValue(true);
  //     this.itemQuickAddForm.get('isDisplayInMenu')?.setValue(true);
  //     this.itemQuickAddForm.get('isBestSeller')?.setValue(false);
  //     this.itemQuickAddForm.get('isDisabled')?.setValue(false);

  //   } else if (this.categoryTypeId === '3') {
  //     this.itemQuickAddForm.reset();
  //     this.selectedTypeId = '4';
  //     this.itemTypeItem = 'None';
  //     this.itemQuickAddForm.get('categoryTypeId')?.setValue('3');
  //     this.itemQuickAddForm.get('itemTypeId')?.setValue(this.selectedTypeId);
  //     this.itemQuickAddForm.get('itemTypeName')?.setValue(this.itemTypeItem);
  //     this.itemQuickAddForm.get('differentPricing')?.setValue(false);
  //     this.itemQuickAddForm.get('isAvailable')?.setValue(true);
  //     this.itemQuickAddForm.get('isDisplayInMenu')?.setValue(true);
  //     this.itemQuickAddForm.get('isBestSeller')?.setValue(false);
  //     this.itemQuickAddForm.get('isDisabled')?.setValue(false);

  //   } else if (this.categoryTypeId === '4') {
  //     this.itemQuickAddForm.reset();
  //     this.selectedTypeId = '4';
  //     this.itemTypeItem = 'None';
  //     this.itemQuickAddForm.get('categoryTypeId')?.setValue('4');
  //     this.itemQuickAddForm.get('itemTypeId')?.setValue(this.selectedTypeId);
  //     this.itemQuickAddForm.get('itemTypeName')?.setValue(this.itemTypeItem);
  //     this.itemQuickAddForm.get('differentPricing')?.setValue(false);
  //     this.itemQuickAddForm.get('isAvailable')?.setValue(true);
  //     this.itemQuickAddForm.get('isDisplayInMenu')?.setValue(true);
  //     this.itemQuickAddForm.get('isBestSeller')?.setValue(false);
  //     this.itemQuickAddForm.get('isDisabled')?.setValue(false);
  //   }

  // }


  selectCategoryType(categoryTypeId: string): void {
    this.itemQuickAddForm.reset();
    this.selectedTypeId = '4';
    this.itemTypeItem = 'None';
  
    if (categoryTypeId === '1' || categoryTypeId === '2' || categoryTypeId === '3' || categoryTypeId === '4') {
      this.itemQuickAddForm.get('categoryTypeId')?.setValue(categoryTypeId);
    }
  
    this.itemQuickAddForm.get('itemTypeId')?.setValue(this.selectedTypeId);
    this.itemQuickAddForm.get('itemTypeName')?.setValue(this.itemTypeItem);
    this.itemQuickAddForm.get('differentPricing')?.setValue(false);
    this.itemQuickAddForm.get('isAvailable')?.setValue(true);
    this.itemQuickAddForm.get('isDisplayInMenu')?.setValue(true);
    this.itemQuickAddForm.get('isBestSeller')?.setValue(false);
    this.itemQuickAddForm.get('isDisabled')?.setValue(false);
  }
  

  ngOnInit(): void {
    this.getCategory();
    this.getItemType();

    this.route.queryParams.subscribe(params => {
      this.categoryTypeId = params['categoryTypeId'];
      this.getAllUnits(this.categoryTypeId);
    });
    this.selectCategoryType(this.categoryTypeId);

    this.itemQuickAddForm.get('itemPrice')?.valueChanges.subscribe(() => this.calculateFinalPrice());
    this.itemQuickAddForm.get('itemTax')?.valueChanges.subscribe(() => this.calculateFinalPrice());

    this.priceInfoArray.controls.forEach((itemControl: AbstractControl) => {
      if (itemControl instanceof FormGroup) {
        itemControl.get('itemPrice')?.valueChanges.subscribe(() => this.calculateFinalPrice());
        itemControl.get('itemTax')?.valueChanges.subscribe(() => this.calculateFinalPrice());
      }
    });

    // this.itemQuickAddForm.get('allowedOutlets')?.valueChanges.subscribe((selectedOutlets) => {
    //   console.log('Selected Outlets:', selectedOutlets);
    //   const atLeastOneOutletSelected = selectedOutlets && selectedOutlets.length > 0;
    //   if (atLeastOneOutletSelected) {
    //     this.addNewPriceItem(1);
    //   } else { }
    // });
    this.itemQuickAddForm.get('allowedOutlets')?.valueChanges.subscribe((selectedOutlets) => {
      console.log('Selected Outlets:', selectedOutlets);
      const atLeastOneOutletSelected = selectedOutlets && selectedOutlets.length > 0;

      // If at least one outlet is selected, add a new form array item
      if (atLeastOneOutletSelected) {
        this.addNewPriceItem(selectedOutlets);
      } else {
        // If no outlets are selected, clear the form array
        this.clearOutletsFormArray();
      }
    });
  }


  addNewPriceItem(selectedOutlets: any[]): void {
    const outletsFormArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;

    // Remove form array items that are no longer selected
    this.removeUnselectedItems(selectedOutlets);

    // Add new form array items for the selected outlets
    for (const outlet of selectedOutlets) {
      if (!this.outletFormArrayMap.has(outlet)) {
        const newOutletFormGroup = this.fb.group({
          itemPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
          itemTax: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?%?$/)]],
          itemFinalPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]]
        });

        outletsFormArray.push(newOutletFormGroup);
        this.outletFormArrayMap.set(outlet, newOutletFormGroup);
      }
    }
  }

  // Function to remove unselected form array items
  removeUnselectedItems(selectedOutlets: any[]): void {
    const outletsFormArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;

    // Iterate through the existing form array items
    for (const outletFormGroup of outletsFormArray.controls as FormGroup[]) {
      const outlet = this.getKeyByValue(this.outletFormArrayMap, outletFormGroup);

      // If the outlet is not in the selected outlets array, remove the form array item
      if (!selectedOutlets.includes(outlet)) {
        outletsFormArray.removeAt(outletsFormArray.controls.indexOf(outletFormGroup));
        this.outletFormArrayMap.delete(outlet);
      }
    }
  }

  // Function to clear the outletsFormArray
  clearOutletsFormArray(): void {
    const outletsFormArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
    outletsFormArray.clear();
    this.outletFormArrayMap.clear();
  }

  // Helper function to get a key from a Map by its value
  getKeyByValue(map: Map<any, FormGroup>, value: FormGroup): any | undefined {
    for (const [key, val] of map.entries()) {
      if (val === value) {
        return key;
      }
    }
    return undefined;
  }

  // addNewPriceItem(selectedOutlets: any[]): void {
  //   const outletsFormArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;

  //   // Add your logic to create a new form group or control based on selectedOutlets
  //   const newOutletFormGroup = this.fb.group({
  //     itemPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
  //     itemTax: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?%?$/)]],
  //     itemFinalPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]]
  //   });

  //   outletsFormArray.push(newOutletFormGroup);
  // }

  // // Function to clear the outletsFormArray
  // clearOutletsFormArray(): void {
  //   const outletsFormArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
  //   outletsFormArray.clear();
  // }

  // general
  onRadioChange(option: string): void {
    this.selectedOption = option;
  }
  // calculateFinalPrice() {
  //   const itemPriceControl = this.itemQuickAddForm.get('itemPrice');
  //   const itemTaxControl = this.itemQuickAddForm.get('itemTax');
  //   const price = (typeof itemPriceControl?.value === 'string' ? parseFloat(itemPriceControl.value) : 0) || 0;
  //   const tax = (typeof itemTaxControl?.value === 'string' ? parseFloat(itemTaxControl.value) : 0) || 0;
  //   const finalPrice = price + (price * (tax / 100));
  //   this.itemQuickAddForm.get('itemFinalPrice')?.setValue(finalPrice.toFixed(2), { emitEvent: false });
  // }

  calculateFinalPrice() {
    const itemPriceArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
    itemPriceArray.controls.forEach((itemControl: AbstractControl) => {
      if (itemControl instanceof FormGroup) {
        const itemPriceControl = itemControl.get('itemPrice');
        const itemTaxControl = itemControl.get('itemTax');

        const price = (typeof itemPriceControl?.value === 'string' ? parseFloat(itemPriceControl.value) : 0) || 0;
        const tax = (typeof itemTaxControl?.value === 'string' ? parseFloat(itemTaxControl.value) : 0) || 0;
        const finalPrice = price + (price * (tax / 100));

        itemControl.get('itemFinalPrice')?.setValue(finalPrice.toFixed(2), { emitEvent: false });
        console.log('calculated value', finalPrice.toFixed(2));

      }
    });
  }



  // image upload
  onImageUpload(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target?.result || null;
        };
        reader.readAsDataURL(selectedFile);
      } else {
        console.error('Selected file is not an image.');
      }
    }
  }
  removeImage() {
    this.selectedImage = null;
    this.itemQuickAddForm.get('imageUrl')?.reset();
  }

  // save item
  onSaveMenuItem() {
    if (this.itemQuickAddForm.valid) {
      console.log('Item Info', this.itemQuickAddForm)
      if (this.itemQuickAddForm.get('categoryName')?.value !== '') {
        this.itemQuickAddForm.get('categoryId')?.setValue(this.selectedCategoryId);
      }
      if (this.itemQuickAddForm.get('subCategoryName')?.value !== '') {
        this.itemQuickAddForm.get('subCategoryId')?.setValue(this.selectedSubCategoryId);
      }
      if (this.itemQuickAddForm.get('itemTypeName')?.value !== '') {
        this.itemQuickAddForm.get('itemTypeId')?.setValue(this.selectedTypeId);
      }
      // if (this.itemQuickAddForm.get('allowedOutlets')?.value !== '') {
      //   this.itemQuickAddForm.get('allowedOutletsId')?.setValue(this.selectedUnitId);
      // }

      const allowedOutletsValue = this.itemQuickAddForm.get('allowedOutlets')?.value;

      if (Array.isArray(allowedOutletsValue) && allowedOutletsValue.length > 0) {
        this.itemQuickAddForm.get('allowedOutletsId')?.setValue(this.selectedUnitId);
      }


      this.loading = true;
      this.apiService.saveMenuItem(this.itemQuickAddForm.value, this.categoryTypeId).subscribe(
        (response: any) => {
          console.log('Quickadd saved successfully', response);
          // this.itemQuickAddForm.get('allowedOutlets')?.setValue([]);
          this.itemQuickAddForm.reset();
          this.isUniquNameShow = false;
          this.itemQuickAddForm.get('differentPricing')?.setValue(false);
          this.itemQuickAddForm.get('isAvailable')?.setValue(true);
          this.itemQuickAddForm.get('isDisplayInMenu')?.setValue(true);
          this.itemQuickAddForm.get('isBestSeller')?.setValue(false);
          this.itemQuickAddForm.get('isDisabled')?.setValue(false);
          if (this.categoryTypeId === '2' || this.categoryTypeId === '3' || this.categoryTypeId === '4') {
            this.itemQuickAddForm.get('itemTypeId')?.setValue('4');
            this.itemQuickAddForm.get('itemTypeName')?.setValue('None');
          }
        },
        (error) => {
          this.loading = false;
          if (error.status == 412) {
            this.isUniquNameShow = true;
            this.itemQuickAddForm.markAllAsTouched();
          }
          console.error('Error saving Quickadd', error);
        },
        () => {
          this.loading = false;
          this.alertSuccess = true;
        }
      );
    } else {
      this.itemQuickAddForm.markAllAsTouched();
    }
    this.alertSuccess = false;
  }

  // navigation
  navigateToBatchEntry() {
    const routePath = { '1': '/core/menueditor/batchentry', '2': '/core/menueditor/batchentry', '3': '/core/menueditor/batchentry', '4': '/core/menueditor/batchentry' }[this.categoryTypeId];
    if (routePath) {
      this.router.navigate([routePath], { queryParams: { categoryTypeId: this.categoryTypeId } });
    } else {
      console.error('Invalid categoryTypeId:', this.categoryTypeId);
    }
  }
  navigateToFeaturedGroup() {
    const routePath = this.categoryTypeId === '1' ? '/core/menueditor/featuredgroup' : '/core/menueditor/featuredgroup';
    this.router.navigate([routePath], { queryParams: { categoryTypeId: this.categoryTypeId } });
  }

  onItemsBatchEntry() {
    if (this.itemQuickAddForm.dirty) {
      this.batchEntryClicked = true;
      this.formChangeWarningDialog = true;
    } else {
      this.itemQuickAddForm.reset();
      this.navigateToBatchEntry();
    }
  }
  onItemsfeaturedGroup() {
    if (this.itemQuickAddForm.dirty) {
      this.featuredGroupClicked = true;
      this.formChangeWarningDialog = true;
    } else {
      this.itemQuickAddForm.reset();
      this.navigateToFeaturedGroup();
    }
  }
  onConfirmClearChanges() {
    this.itemQuickAddForm.reset();
    this.formChangeWarningDialog = false;

    if (this.batchEntryClicked) {
      this.navigateToBatchEntry();
    } else if (this.featuredGroupClicked) {
      this.navigateToFeaturedGroup();
    }
  }
  onCancelClearChanges() {
    this.formChangeWarningDialog = false;
    this.formChangeDetectedDialog = false;
    this.batchEntryClicked = false;
    this.featuredGroupClicked = false;
  }

  // return to home
  onCancelClick() {
    if (this.itemQuickAddForm.dirty) {
      this.formChangeDetectedDialog = true;
    }
    else {
      this.alertSuccess = false;
      this.itemQuickAddForm.reset();
      this.router.navigate(['/core/menueditor']);
    }
  }
  onBackConfirmClick() {
    this.alertSuccess = false;
    this.itemQuickAddForm.reset();
    this.router.navigate(['/core/menueditor']);
  }
}

