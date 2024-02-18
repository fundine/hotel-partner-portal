import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  pageName!: string;

  // internalServerErrorDialog: boolean = false;

  ngOnInit(): void { }

  onTabClicked(tabName: string) {
    this.pageName = tabName;
  }

  // onCancelDialog() {
  //   this.internalServerErrorDialog = false;
  // }

  // onInternalServerError() {
  //   this.internalServerErrorDialog = true;
  // }

}
