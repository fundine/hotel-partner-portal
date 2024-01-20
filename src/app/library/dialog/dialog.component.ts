import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() title!: string;
  @Input() type!: string;
  @Input() message!: string;
  @Input() customClass!: string;
  @Output() confirmClick = new EventEmitter();
  @Output() cancelClick = new EventEmitter();

  constructor() { }

  onClickContinue() {
    this.confirmClick.emit();
  }
  onClickCancel() {
    this.cancelClick.emit();
  }

}
