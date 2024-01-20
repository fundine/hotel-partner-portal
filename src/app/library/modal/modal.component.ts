import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() header!: string;
  @Input() footer!: string;
  @Input() customClass!: string;
  @Input() modalTitle!: string | undefined;
  @Output() closed = new EventEmitter<void>();
  
  closeModal() {
    this.closed.emit();
  }
}
