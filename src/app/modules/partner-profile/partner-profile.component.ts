import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environment';

@Component({
  selector: 'app-partner-profile',
  templateUrl: './partner-profile.component.html',
  styleUrls: ['./partner-profile.component.scss']
})
export class PartnerProfileComponent  implements OnInit {

  // global variables
  public roleCode: string = environment.roleCode;
  public categoryTypeId: string[] = environment.categoryTypeId;
  // end global variables

  currentPage: string = 'outlet-management';

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.updateUrl();
  }

  // general 
  loadPage(page: string): void {  
    this.currentPage = page;
    this.updateUrl();
  }
  private updateUrl(): void {
    const formattedPage = this.currentPage.toLowerCase().replace(/[\s-]+/g, '');
    this.location.go(`/core/partnerprofile/${formattedPage}`);
  }

}

