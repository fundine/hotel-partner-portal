import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {
  
  @Input() message!: string;
  @Input() type!: string;
  @Input() position!: string;
  @Input() customClass!: string;
  title: boolean = false;
  showToaster: boolean = false;

  constructor() { }

  ngOnInit() {
    this.showToaster = true;
    setTimeout(() => {
      this.showToaster = false;
    }, 3000);
  }
}
