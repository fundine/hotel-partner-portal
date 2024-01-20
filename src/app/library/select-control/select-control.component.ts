import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'select-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true,
    },
  ],
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss']
})
export class SelectControlComponent implements ControlValueAccessor {

  @Input() title!: string;
  @Input() options: any = [];
  @Input() selectedItem: any;
  @Input() validation!: string;
  @Input() placeholder!: string;
  @Input() customClass!: string;
  @Input() controlAddType!: string;
  @Input() noLabel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() validationClass: boolean = false;
  @Output() optionSelected = new EventEmitter<string>();

  isDropdownOpen = false;
  openResCategoryModal = false;
  openResSubCategoryModal = false;

  private onChange: any = () => { };
  private onTouched: any = () => { };

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedItem = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.selectedItem = option;
    this.isDropdownOpen = false;
    this.onChange(this.selectedItem);
    this.onTouched();
    this.optionSelected.emit(this.selectedItem);
  }

  resetSelection() {
    this.selectedItem = null;
    this.onChange(null);
    this.onTouched();
    this.isDropdownOpen = false;
  }

  selectListOutsideClick(e: Event) {
    this.isDropdownOpen = false;
  }

  onModalClosed() {
    this.openResCategoryModal = false;
    this.openResSubCategoryModal = false;
  }

  openRestCategoryAdd() {
    this.isDropdownOpen = false;
    this.openResCategoryModal = true;
    this.openResSubCategoryModal = false;
  }

  openRestSubCategoryAdd() {
    this.isDropdownOpen = false;
    this.openResSubCategoryModal = true;
    this.openResCategoryModal = false;
  }
}


