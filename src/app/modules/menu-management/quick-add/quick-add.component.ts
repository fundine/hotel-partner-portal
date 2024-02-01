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
  unitFilter: boolean = true;
  loading: boolean = false;
  alertSuccess: boolean = false;
  priceCalculationModal: boolean = false;
  isUniquNameShow: boolean = false;
  formChangeWarningDialog: boolean = false;
  formChangeDetectedDialog: boolean = false;
  batchEntryClicked: boolean = false;
  featuredGroupClicked: boolean = false;
  selectedImage: string | ArrayBuffer | null = null;
  selectedOption: string = 'cafe';
  itemPriceInfo: any = [];
  outletFormArrayMap: Map<any, FormGroup> = new Map<any, FormGroup>();

  // api
  selectedCategoryId: any;
  categoryItem: string = '';
  categoryOptions: any;
  categoryList: { id: string; categoryName: string; }[] | undefined;
  selectedOutlets: any;
  finalPrice: any;
  differentPricingFlag: boolean = false;

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
  getAllUnits(categoryTypeId: any, unitFilter: boolean) {
    this.apiService.getUnitListData(categoryTypeId, unitFilter).subscribe(
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
    allowedOutlets: [this.fb.array([]), [Validators.required]],
    categoryId: [''],
    categoryName: ['', [Validators.required]],
    subCategoryId: [''],
    subCategoryName: [''],
    description: ['', [Validators.maxLength(500)]],
    differentPricing: [false],
    itemPriceArray: this.fb.array([]),
    isAvailable: [true],
    isDisplayInMenu: [true],
    isBestSeller: [false],
    isDisabled: [false],
  });
  get priceInfoArray() {
    return this.itemQuickAddForm.get('itemPriceArray') as FormArray;
  };
  controlClass(formArrayName: string, index?: number, innerControlName?: string) {
    if (index !== undefined && innerControlName) {
      const control = this.itemQuickAddForm?.get(formArrayName) as FormArray;
      const innerControl = control.at(index)?.get(innerControlName);
      return {
        'is-invalid': innerControl?.invalid && (innerControl?.dirty || innerControl?.touched),
      };
    } else {
      const control = this.itemQuickAddForm?.get(formArrayName);
      return {
        'is-invalid': control?.invalid && (control?.dirty || control?.touched),
      };
    }
  }
  get itemInfo() {
    return this.itemQuickAddForm;
  }

  // price calculation form
  priceCalculationForm = this.fb.group({
    itemFinalPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
    packageCost: ['', [Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
    itemTax: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?%?$/)]],
    itemPrice: ['0.00'],
  })
  errorClass(controlName: string) {
    return { 'is-invalid': this.priceCalculationForm?.get(controlName)?.invalid && this.priceCalculationForm?.get(controlName)?.touched };
  }

  selectCategoryType(categoryTypeId: string): void {
    this.itemQuickAddForm.reset();
    this.selectedTypeId = '4';
    this.itemTypeItem = 'None';

    if (categoryTypeId === '1' || categoryTypeId === '2' || categoryTypeId === '3' || categoryTypeId === '4') {
      this.itemQuickAddForm.get('categoryTypeId')?.setValue(categoryTypeId);
    }
    if (categoryTypeId === '2' || categoryTypeId === '3' || categoryTypeId === '4') {
      this.itemQuickAddForm.get('itemTypeId')?.setValue(this.selectedTypeId);
      this.itemQuickAddForm.get('itemTypeName')?.setValue(this.itemTypeItem);
    }
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
      this.getAllUnits(this.categoryTypeId, this.unitFilter);
    });
    this.selectCategoryType(this.categoryTypeId);

    const itemPriceArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
    if (!this.differentPricingFlag) {
      this.addSinglePriceItem({});
    }
    itemPriceArray.valueChanges.subscribe(() => this.calculateFinalPrice());
    this.calculateItemPrice();
    this.itemQuickAddForm.get('allowedOutlets')?.valueChanges.subscribe((selectedOutlets: any) => {
      console.log('Selected Outlets:', selectedOutlets);
      const atLeastOneOutletSelected = selectedOutlets && selectedOutlets.length > 0;

      // If at least one outlet is selected, add a new form array item
      if (atLeastOneOutletSelected && !this.differentPricingFlag) {
        this.addSinglePriceItem(selectedOutlets);
      } else if (atLeastOneOutletSelected && this.differentPricingFlag) {
        if (selectedOutlets.length > 0) {
          this.addNewPriceItem(selectedOutlets);
        }
      }
      else if (!atLeastOneOutletSelected && !this.differentPricingFlag) {
        this.addSinglePriceItem(selectedOutlets);
      }
      else {
        this.clearOutletsFormArray();
      }
    });
  }

  toggleDifferentPricing() {
    this.differentPricingFlag = !this.differentPricingFlag;
    const allowedOutletsControl = this.itemQuickAddForm.get('allowedOutlets');
    if (this.differentPricingFlag) {
      const outletsFormArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
      if (outletsFormArray.length > 1) {
        while (outletsFormArray.length > 1) {
          outletsFormArray.removeAt(1);
        }
      }
    } else {
      this.selectedOutlets = (this.itemQuickAddForm.get('itemPriceArray') as FormArray).controls.slice(1);
      const outletsFormArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
      while (outletsFormArray.length > 1) {
        outletsFormArray.removeAt(1);
      }
    }
    allowedOutletsControl?.updateValueAndValidity();
  }

  addSinglePriceItem(selectedOutlet: any): void {
    const outletsFormArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
    if (outletsFormArray.length === 0) {
      const defaultOutletFormGroup = this.fb.group({
        itemPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
        packageCost: ['', [Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
        taxId: [''],
        itemTax: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?%?$/)]],
        itemFinalPrice: ['0.00'],
      });
      outletsFormArray.push(defaultOutletFormGroup);
    }

    if (selectedOutlet) {
      const defaultOutletFormGroup = outletsFormArray.at(0) as FormGroup;
      defaultOutletFormGroup.patchValue(selectedOutlet);
    }
  }



  addNewPriceItem(selectedOutlets: any): void {
    const outletsFormArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
    this.removeUnselectedItems(selectedOutlets);
    
    for (const outlet of selectedOutlets) {
      if (!this.outletFormArrayMap.has(outlet)) {
        const newOutletFormGroup = this.fb.group({
          itemPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
          packageCost: ['', [Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
          taxId: [''],
          itemTax: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?%?$/)]],
          itemFinalPrice: [''],
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

  clearOutletsFormArray(): void {
    const outletsFormArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
    outletsFormArray.clear();
    this.outletFormArrayMap.clear();
  }

  getKeyByValue(map: Map<any, FormGroup>, value: FormGroup): any | undefined {
    for (const [key, val] of map.entries()) {
      if (val === value) {
        return key;
      }
    }
    return undefined;
  }

  // general
  onRadioChange(option: string): void {
    this.selectedOption = option;
  }
  calculateFinalPrice() {
    const itemPriceArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
    itemPriceArray.controls.forEach((itemControl: AbstractControl) => {
      if (itemControl instanceof FormGroup) {
        const itemPriceControl = itemControl.get('itemPrice');
        const itemPackageCostControl = itemControl.get('packageCost');
        const itemTaxControl = itemControl.get('itemTax');

        const price = (typeof itemPriceControl?.value === 'string' ? parseFloat(itemPriceControl.value) : 0) || 0;
        const packageCost = (typeof itemPackageCostControl?.value === 'string' ? parseFloat(itemPackageCostControl.value) : 0) || 0;
        const tax = (typeof itemTaxControl?.value === 'string' ? parseFloat(itemTaxControl.value) : 0) || 0;
        const finalPrice = (price + packageCost) * (1 + (tax / 100));

        itemControl.get('itemFinalPrice')?.setValue(finalPrice.toFixed(2), { emitEvent: false });
      }
    });
  }
  openPriceCalculationModal() {
    this.priceCalculationModal = true;
  }
  calculateItemPrice() {
    const itemFinalPriceControl = this.priceCalculationForm.get('itemFinalPrice');
    const packageCostControl = this.priceCalculationForm.get('packageCost');
    const itemTaxControl = this.priceCalculationForm.get('itemTax');
    const itemPriceControl = this.priceCalculationForm.get('itemPrice');

    const itemFinalPrice = (itemFinalPriceControl?.value || '0.00') as string;
    const packageCost = (packageCostControl?.value || '0.00') as string;
    const tax = (itemTaxControl?.value || '0') as string;

    if (itemFinalPriceControl && itemFinalPriceControl.value !== '' && packageCostControl) {
      const calculatedPrice = (parseFloat(itemFinalPrice) / (1 + parseFloat(tax) / 100)) - parseFloat(packageCost);
      itemPriceControl?.setValue(calculatedPrice.toFixed(2), { emitEvent: false });
    } else if (packageCostControl) {
      const numericPackageCost = (parseFloat(packageCost) / (1 + parseFloat(tax) / 100));
      itemPriceControl?.setValue(numericPackageCost.toFixed(2), { emitEvent: false });
    }
    else {
      itemPriceControl?.setValue('0.00', { emitEvent: false });
    }

    // if (itemFinalPriceControl) {
    //   itemFinalPriceControl.valueChanges.subscribe((newValue) => {
    //     if (!newValue) {
    //       itemTaxControl?.setValue('');
    //       packageCostControl?.setValue('');
    //       itemPriceControl?.setValue('0.00');
    //     }
    //   });
    // }
  }
  copyItemPrice() {
    const itemPriceControl = this.priceCalculationForm.get('itemPrice');
    if (itemPriceControl) {
      const itemPriceValue: string = itemPriceControl.value!;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(itemPriceValue).then(() => {
        });
      }
    }
  }
  onModalClear() {
    this.priceCalculationForm.reset();
    this.priceCalculationForm.get('itemPrice')?.setValue('0.00');
  }
  onModalClosed() {
    this.priceCalculationModal = false;
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
      const outletsFormArray = this.itemQuickAddForm.get('allowedOutlets') as FormArray;
      const selectedOutletItems = outletsFormArray.value.map((unitName: string) => {
        const unit = this.itemUnitList?.find((item) => item.unitName === unitName);
        if (unit) {
          return { unitId: unit.unitId };
        } else {
          return null;
        }
      });

      const itemPriceArray = this.itemQuickAddForm.get('itemPriceArray') as FormArray;
      const transformedArray = [];

      for (let index = 0; index < selectedOutletItems.length; index++) {
        const unitId = selectedOutletItems[index]?.unitId;
        const item = itemPriceArray.at(index % itemPriceArray.length).value;

        transformedArray.push({
          unitId: unitId || '',
          itemPrice: item.itemPrice,
          packageCost: item.packageCost,
          taxId: item.taxId
        });
      }

      console.log(transformedArray);
      console.log('Form State:', this.itemQuickAddForm);

      const requestBody = {
        categoryId: this.selectedCategoryId,
        subCategoryId: this.selectedSubCategoryId || '',
        itemName: this.itemQuickAddForm.get('itemName')?.value,
        itemTypeId: this.selectedTypeId,
        description: this.itemQuickAddForm.get('description')?.value,
        isBestSeller: this.itemQuickAddForm.get('isBestSeller')?.value,
        isDisplayInMenu: this.itemQuickAddForm.get('isDisplayInMenu')?.value,
        isAvailable: this.itemQuickAddForm.get('isAvailable')?.value,
        isDisabled: this.itemQuickAddForm.get('isDisabled')?.value,
        imageUrl: null,
        itemUnits: selectedOutletItems,
        itemPriceList: transformedArray,
      };

      this.loading = true;
      this.apiService.saveMenuItem(requestBody, this.categoryTypeId).subscribe(
        (response: any) => {
          console.log('Quickadd saved successfully', response);
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

  getItemOutletValue(index: number): string {
    const allowedOutlets: any = this.itemQuickAddForm.get('allowedOutlets')?.value;
    if (Array.isArray(allowedOutlets) && allowedOutlets.length > index) {
      return allowedOutlets[index];
    } else {
      return 'N/A';
    }
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

