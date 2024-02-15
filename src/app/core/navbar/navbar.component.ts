import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() tabClicked: EventEmitter<string> = new EventEmitter<string>();

  // global variables
  public roleCode: string = environment.roleCode;
  public categoryTypeId: string[] = environment.categoryTypeId;
  // end global variables

  activeTab: string = '';

  navigationItems: any = [
    // role 1
    (this.roleCode === '1' ? [
      { tabName: 'guest checkin', route: '/core/guestcheckin', iconClass: 'vi vi-reception-o', name: 'Check-In' },
      { tabName: 'room editor', route: '/core/roomeditor', iconClass: 'vi vi-bed-o', name: 'Rooms' },
      { tabName: 'dine track', route: '/core/dinetrack', iconClass: 'vi vi-dine-o', name: 'Dine-Track' },
      { tabName: 'orders', route: '/core/orders', iconClass: 'vi vi-list-o', name: 'Orders' },
      (this.categoryTypeId.includes('1') ? { tabName: 'menu editor', route: '/core/menueditor', iconClass: 'vi vi-book-o', name: 'Menu' } : null),
      { tabName: 'room cleaning', route: '/core/roomcleaning', iconClass: 'vi vi-cleaning-o', name: 'Cleaning' },
      { tabName: 'wallet parking', route: '/core/walletparking', iconClass: 'vi vi-parking-o', name: 'Parking' },
    ] : null),

    // role 2
    (this.roleCode === '2' ? [
      { tabName: 'insights', route: '/core/insights', iconClass: 'vi vi-insights-o', name: 'Insights' },
      { tabName: 'customers', route: '/core/customers', iconClass: 'vi vi-user-group-o', name: 'Customers' },
      // { tabName: 'broadcast', route: '/core/broadcast', iconClass: 'vi vi-bullhorn-o', name: 'Broadcast' },
      // { tabName: 'reports', route: '/core/reports', iconClass: 'vi vi-file-text', name: 'Reports' },
    ] : []),

    // role 3
    (this.roleCode === '3' ? [
      { tabName: 'insights', route: '/core/insights', iconClass: 'vi vi-insights-o', name: 'Insights' },
      { tabName: 'categories', route: '/core/categorymanagement', iconClass: 'vi vi-category-o', name: 'Categories' },
      { tabName: 'partner profile', route: '/core/partnerprofile', iconClass: 'vi vi-outlet-o', name: 'Profile' },
    ] : []),

    // role 4 : front office staff
    (this.roleCode === '4' ? [
      { tabName: 'guest checkin', route: '/core/guestcheckin', iconClass: 'vi vi-reception-o', name: 'Check-In' },
      { tabName: 'orders', route: '/core/orders', iconClass: 'vi vi-list-o', name: 'Orders' },
      // { tabName: 'dine track', route: '/core/dinetrack', iconClass: 'vi vi-dine-o', name: 'Dine-Track' },
      // { tabName: 'room cleaning', route: '/core/roomcleaning', iconClass: 'vi vi-room-cleaning-o', name: 'Cleaning' },
      { tabName: 'valet parking', route: '/core/valetparking', iconClass: 'vi vi-parking-o', name: 'Parking' },
      { tabName: 'partner profile', route: '/core/partnerprofile', iconClass: 'vi vi-outlet-o', name: 'Profile' },

      { tabName: 'room editor', route: '/core/roomeditor', iconClass: 'vi vi-bed-o', name: 'Rooms' },
      (this.categoryTypeId.includes('1') ? { tabName: 'menu editor', route: '/core/menueditor', iconClass: 'vi vi-book-o', name: 'Menu' } : null),
      { tabName: 'categories', route: '/core/categorymanagement', iconClass: 'vi vi-category-o', name: 'Categories' },
    ] : []),

    // outlet manager
    (this.roleCode === '102' ? [
      (this.categoryTypeId.includes('1') ? { tabName: 'menu editor', route: '/core/menueditor', iconClass: 'vi vi-book-o', name: 'Menu' } : null),
      { tabName: 'insights', route: '/core/insights', iconClass: 'vi vi-insights-o', name: 'Insights' },
      { tabName: 'customers', route: '/core/customers', iconClass: 'vi vi-user-group-o', name: 'Customers' },
      { tabName: 'categories', route: '/core/categorymanagement', iconClass: 'vi vi-category-o', name: 'Categories' },
      { tabName: 'partner profile', route: '/core/partnerprofile', iconClass: 'vi vi-outlet-o', name: 'Profile' },
    ] : []),
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userDefaultMenuItem();
  }

  // general
  userDefaultMenuItem() {
    if (this.roleCode === '1') {
      this.activeTab = 'orders';
      this.router.navigate(['/core/orders']);
    } else if (this.roleCode === '2') {
      this.activeTab = 'categories';
      this.router.navigate(['/core/categorymanagement']);
    } else if (this.roleCode === '3') {
      this.activeTab = 'insights';
      this.router.navigate(['/core/insights']);
    } else if (this.roleCode === '4') {
      this.activeTab = 'partner profile';
      this.router.navigate(['/core/partnerprofile']);
    } else if (this.roleCode === '102') {
      this.activeTab = 'partner profile';
      this.router.navigate(['/core/partnerprofile']);
    }
    this.tabClicked.emit(this.activeTab);
  }
  onMenuItemClick(tabName: string) {
    this.activeTab = tabName;
    this.tabClicked.emit(tabName);
  }

  // return to home
  returnToHome() {
    this.userDefaultMenuItem();
  }

}
