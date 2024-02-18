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
  openDropdown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.toggleDropdown();
    }
  }
  hideDropdown() {
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 200);
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


  // onKeyDown(event: KeyboardEvent) {
  //   switch (event.key) {
  //     case 'ArrowDown':
  //       this.moveSelection(1); // Move selection down
  //       event.preventDefault(); // Prevent default scroll behavior
  //       break;
  //     case 'ArrowUp':
  //       this.moveSelection(-1); // Move selection up
  //       event.preventDefault(); // Prevent default scroll behavior
  //       break;
  //     case 'Enter':
  //       // Handle selection when Enter is pressed
  //       event.preventDefault(); // Prevent form submission if needed
  //       break;
  //     // case 'Escape':
  //     //   this.hideDropdown(); // Hide dropdown when Escape is pressed
  //     //   break;
  //     default:
  //       break;
  //   }
  // }

  // moveSelection(step: number) {
  //   const currentIndex = this.options.indexOf(this.selectedItem);
  //   let newIndex = currentIndex + step;

  //   // Ensure the newIndex stays within bounds
  //   if (newIndex < 0) {
  //     newIndex = this.options.length - 1;
  //   } else if (newIndex >= this.options.length) {
  //     newIndex = 0;
  //   }

  //   // Update the selectedItem
  //   this.selectedItem = this.options[newIndex];
  // }

}


