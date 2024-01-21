import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-batch-entry',
  templateUrl: './batch-entry.component.html',
  styleUrls: ['./batch-entry.component.scss']
})
export class BatchEntryComponent implements OnInit {


  categoryTypeId: string = '';

  loading: boolean = false;
  alertSuccess: boolean = false;
  emptyItemDialog: boolean = false;
  formChangeWarningDialog: boolean = false;
  formChangeDetectedDialog: boolean = false;
  quickAddClicked: boolean = false;
  itemAdditionalInfo: boolean[] = [];
  featuredGroupClicked: boolean = false;
  selectedImage: (string | null)[] = [];
  // selectedImage: string | ArrayBuffer | null = null;
  // selectedOption: string = 'cafe';
  // activeCategory: string = '1';

  // select control and api
  selectedCategoryId: any;
  categoryItem: string = '';
  categoryOptions: any;
  categoryList: { id: string; categoryName: string; }[] | undefined;
  newMenuInfo: any = []
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

  selectedTypeId: string[] = [];
  itemTypeItem: string[] = [];
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
  selectItemType(event: any, index: number) {
    const selectedTypeName = event as string;
    const selectedTypeItem = this.itemTypeList!.find(item => item.itemTypeName === selectedTypeName);

    if (selectedTypeItem) {
      this.selectedTypeId[index] = selectedTypeItem.id;
      this.itemTypeItem[index] = selectedTypeItem.itemTypeName;
      this.newMenuInfo.value[index].itemTypeId = selectedTypeItem.id;

    }
  }

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.menuBatchEntryForm.get('categoryName')?.valueChanges.subscribe(() => {
      this.menuBatchEntryForm.get('subCategoryName')?.setValue('');
    });
  }

  // batch entry form
  menuBatchEntryForm = this.fb.group({
    categoryTypeId: [''],
    allowedOutlets: [[], [Validators.required]],
    categoryId: [''],
    categoryName: ['', [Validators.required]],
    subCategoryId: [''],
    subCategoryName: [''],
    menuArray: this.fb.array([]), 
  })
  addNewMenuItem(defaultItemCount: number = 1) {
    this.newMenuInfo = this.menuInfoArray;
    for (let i = 0; i < defaultItemCount; i++) {
      const newItemGroup = this.fb.group({
        imageUrl: [null],
        itemName: ['', [Validators.required, Validators.maxLength(100)]],
        itemTypeId: [''],
        itemTypeName: ['', [Validators.required]],
        itemPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
        itemTax: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?%?$/)]],
        itemFinalPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
        description: ['', [Validators.maxLength(500)]],
        isAvailable: [true],
        isDisplayInMenu: [true],
        isDisabled: [false],
        isBestSeller: [false]
      });
      this.newMenuInfo.push(newItemGroup);
    }
  }
  controlClass(formControlName: string, index?: number, innerControlName?: string) {
    if (index !== undefined && innerControlName) {
      const control = this.menuBatchEntryForm?.get(formControlName) as FormArray;
      const innerControl = control.at(index)?.get(innerControlName);
      return {
        'is-invalid': innerControl?.invalid && (innerControl?.dirty || innerControl?.touched),
      };
    } else {
      const control = this.menuBatchEntryForm?.get(formControlName);
      return {
        'is-invalid': control?.invalid && (control?.dirty || control?.touched),
      };
    }
  }
  get menuInfoArray() {
    return this.menuBatchEntryForm.get('menuArray') as FormArray;
  }
  selectCategoryType(categoryTypeId: string): void {
    const menuArray = this.menuBatchEntryForm.get('menuArray') as FormArray;
    if (categoryTypeId === '1') {
      this.menuBatchEntryForm.reset();
      this.menuBatchEntryForm.get('categoryTypeId')?.setValue('1');
      menuArray.controls.forEach((control: AbstractControl) => {
        (control as FormGroup).get('isAvailable')?.setValue(true);
        (control as FormGroup).get('isDisplayInMenu')?.setValue(true);
        (control as FormGroup).get('isBestSeller')?.setValue(false);
        (control as FormGroup).get('isDisabled')?.setValue(false);
      });
     
    } else if (categoryTypeId === '2') {
      this.menuBatchEntryForm.reset();
      this.menuBatchEntryForm.get('categoryTypeId')?.setValue('2');
      menuArray.controls.forEach((control: AbstractControl) => {
        (control as FormGroup).get('itemTypeId')?.setValue('4');
        (control as FormGroup).get('itemTypeName')?.setValue('None');
        (control as FormGroup).get('isAvailable')?.setValue(true);
        (control as FormGroup).get('isDisplayInMenu')?.setValue(true);
        (control as FormGroup).get('isBestSeller')?.setValue(false);
        (control as FormGroup).get('isDisabled')?.setValue(false);
      });
      console.log('menu array', menuArray)
    } else if (categoryTypeId === '3') {
      this.menuBatchEntryForm.reset();
      this.menuBatchEntryForm.get('categoryTypeId')?.setValue('3');
      menuArray.controls.forEach((control: AbstractControl) => {
        (control as FormGroup).get('itemTypeId')?.setValue('4');
        (control as FormGroup).get('itemTypeName')?.setValue('None');
        (control as FormGroup).get('isAvailable')?.setValue(true);
        (control as FormGroup).get('isDisplayInMenu')?.setValue(true);
        (control as FormGroup).get('isBestSeller')?.setValue(false);
        (control as FormGroup).get('isDisabled')?.setValue(false);
      });
    } else if (categoryTypeId === '4') {
      this.menuBatchEntryForm.reset();
      this.menuBatchEntryForm.get('categoryTypeId')?.setValue('4');
      menuArray.controls.forEach((control: AbstractControl) => {
        (control as FormGroup).get('itemTypeId')?.setValue('4');
        (control as FormGroup).get('itemTypeName')?.setValue('None');
        (control as FormGroup).get('isAvailable')?.setValue(true);
        (control as FormGroup).get('isDisplayInMenu')?.setValue(true);
        (control as FormGroup).get('isBestSeller')?.setValue(false);
        (control as FormGroup).get('isDisabled')?.setValue(false);
      });
    }
  }
  toggleItemInfo(index: number): void {
    this.itemAdditionalInfo[index] = !this.itemAdditionalInfo[index];
  }
  closeItemAdditionalInfo(index: number): void {
    this.itemAdditionalInfo[index] = false;
  }
  removeItemRow(index: number): void {
    this.menuInfoArray.removeAt(index);
  }

  ngOnInit(): void {
    this.getCategory();
    this.getItemType();
    this.route.queryParams.subscribe(params => {
      this.categoryTypeId = params['categoryTypeId'];
    });
    
    this.addNewMenuItem(5);
    this.selectCategoryType(this.categoryTypeId);

    this.newMenuInfo.controls.forEach((control: AbstractControl, index: number) => {
      control.get('itemPrice')?.valueChanges.subscribe(() => this.calculateFinalPrice(index));
      control.get('itemTax')?.valueChanges.subscribe(() => this.calculateFinalPrice(index));
    });
  }

  // general
  calculateFinalPrice(index: number) {
    const itemPriceControl = this.newMenuInfo.at(index).get('itemPrice');
    const itemTaxControl = this.newMenuInfo.at(index).get('itemTax');
    const price = (typeof itemPriceControl?.value === 'string' ? parseFloat(itemPriceControl.value) : 0) || 0;
    const tax = (typeof itemTaxControl?.value === 'string' ? parseFloat(itemTaxControl.value) : 0) || 0;
    const finalPrice = price + (price * (tax / 100));
    this.newMenuInfo.at(index).get('itemFinalPrice')?.setValue(finalPrice.toFixed(2), { emitEvent: false });
  }
  onCancelInfo() {
    this.emptyItemDialog = false;
  }

  // image upload
  onImageUpload(event: any, index: number) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage[index] = e.target?.result as string ?? null;
          console.log('Selected Image:', this.selectedImage[index]);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        console.error('Selected file is not an image.');
      }
    }
  }
  removeImage(index: number) {
    this.selectedImage[index] = null;
    this.menuInfoArray.controls[index].get('imageUrl')?.reset();
  }

  // save items
  onSaveAllMenuItems() {
    if (this.menuBatchEntryForm.valid) {
      const menuArray = this.menuBatchEntryForm.get('menuArray') as FormArray;

      if (menuArray.length !== 0) {
        this.loading = true;

        if (this.menuBatchEntryForm.get('categoryName')?.value !== '') {
          this.menuBatchEntryForm.get('categoryId')?.setValue(this.selectedCategoryId);
        }
        if (this.menuBatchEntryForm.get('subCategoryName')?.value !== '') {
          this.menuBatchEntryForm.get('subCategoryId')?.setValue(this.selectedSubCategoryId);
        }
        for (let i = 0; i < this.newMenuInfo.length; i++) {
          if (this.menuBatchEntryForm.get('itemTypeName')?.value !== '') {
            this.newMenuInfo.at(i).get('itemTypeId')?.setValue(this.newMenuInfo.value[i].itemTypeId);
          }
        }

        console.log('All Items Info', this.menuBatchEntryForm)
        const requestBody = {
          categoryId: this.menuBatchEntryForm.get('categoryId')?.value,
          subCategoryId: this.menuBatchEntryForm.get('subCategoryId')?.value,
          items: this.menuBatchEntryForm.value.menuArray
        };
        this.apiService.saveBatchItem(requestBody, this.categoryTypeId).subscribe(
          (response: any) => {
            this.menuBatchEntryForm.reset();
            this.loading = false;
            this.alertSuccess = true;

            menuArray.controls.forEach((control: AbstractControl) => {
              (control as FormGroup).get('isAvailable')?.setValue(true);
              (control as FormGroup).get('isDisplayInMenu')?.setValue(true);
              (control as FormGroup).get('isBestSeller')?.setValue(false);
              (control as FormGroup).get('isDisabled')?.setValue(false);
              
              if (this.categoryTypeId === '2' || this.categoryTypeId === '3' || this.categoryTypeId === '4') {
                (control as FormGroup).get('itemTypeId')?.setValue('4');
                (control as FormGroup).get('itemTypeName')?.setValue('None');
              }
            });

          },
          (error) => {
            this.loading = false;
            if (error.status == 412) {
              this.menuBatchEntryForm.markAllAsTouched();
            }
            console.error('Error saving batch entry', error);
          },
          () => {
            this.loading = false;
            this.alertSuccess = true;
          }
        );
      } else {
        this.emptyItemDialog = true;
      }
    } else {
      this.menuBatchEntryForm.markAllAsTouched();
    }
    this.alertSuccess = false;
  }

  // navigation
  navigateToQuickAdd() {
    const routePath = { '1': '/core/menueditor/quickadd', '2': '/core/menueditor/quickadd', '3': '/core/menueditor/quickadd', '4': '/core/menueditor/quickadd' }[this.categoryTypeId];
    if (routePath) {
      this.router.navigate([routePath], { queryParams: { categoryTypeId: this.categoryTypeId } });
    }
  }
  navigateToFeaturedGroup() {
    const routePath = this.categoryTypeId === '1' ? '/core/menueditor/featuredgroup' : '/core/menueditor/featuredgroup';
    this.router.navigate([routePath], { queryParams: { categoryTypeId: this.categoryTypeId } });
  }

  onItemsQuickAdd() {
    if (this.menuBatchEntryForm.dirty) {
      this.quickAddClicked = true;
      this.formChangeWarningDialog = true;
    } else {
      this.menuBatchEntryForm.reset();
      this.navigateToQuickAdd();
    }
  }
  onItemsfeaturedGroup() {
    if (this.menuBatchEntryForm.dirty) {
      this.featuredGroupClicked = true;
      this.formChangeWarningDialog = true;
    } else {
      this.menuBatchEntryForm.reset();
      this.navigateToFeaturedGroup();
    }
  }
  onConfirmClearChanges() {
    this.menuBatchEntryForm.reset();
    this.formChangeWarningDialog = false;

    if (this.quickAddClicked) {
      this.navigateToQuickAdd();
    } else if (this.featuredGroupClicked) {
      this.navigateToFeaturedGroup();
    }
  }
  onCancelClearChanges() {
    this.formChangeWarningDialog = false;
    this.formChangeDetectedDialog = false;
    this.quickAddClicked = false;
    this.featuredGroupClicked = false;
  }

  // return to home
  onCancelClick() {
    if (this.menuBatchEntryForm.dirty) {
      this.formChangeDetectedDialog = true;
    }
    else {
      this.alertSuccess = false;
      this.menuBatchEntryForm.reset();
      this.router.navigate(['/core/menueditor']);
    }
  }
  onBackConfirmClick() {
    this.alertSuccess = false;
    this.menuBatchEntryForm.reset();
    this.router.navigate(['/core/menueditor']);
  }

}

