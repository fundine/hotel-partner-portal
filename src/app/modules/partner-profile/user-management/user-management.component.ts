import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users = [
    {
      userRoleId: '1',
      userRole: 'Manager',
      items: [
        { userId: '123', userName: 'John Doe', userRoleId: 1, userRole: 'Manager', assignedUnits: 'Outlet A, Outlet B', lastActive: '2023-12-11 10:30 AM', isDisable: false },
        { userId: '123', userName: 'Jane Smith', userRoleId: 2, userRole: 'Manager', assignedUnits: 'Outlet C', lastActive: '2023-12-11 09:45 AM', isDisable: false },
        { userId: '123', userName: 'Bob Johnson', userRoleId: 3, userRole: 'Manager', assignedUnits: 'Outlet D, Outlet E', lastActive: '2023-12-11 11:15 AM', isDisable: false },
        { userId: '123', userName: 'Alice Miller', userRoleId: 4, userRole: 'Manager', assignedUnits: 'Outlet F', lastActive: '2023-12-11 10:00 AM', isDisable: false },
        { userId: '123', userName: 'Charlie Brown', userRoleId: 5, userRole: 'Manager', assignedUnits: 'Outlet G', lastActive: '2023-12-11 12:00 PM', isDisable: false }
      ]
    },
    {
      userRoleId: '2',
      userRole: 'Cashier',
      items: [
        { userId: '123', userName: 'John Doe', userRoleId: 1, userRole: 'Cashier', assignedUnits: 'Outlet A, Outlet B', lastActive: '2023-12-11 10:30 AM', isDisable: false },
        { userId: '123', userName: 'Jane Smith', userRoleId: 2, userRole: 'Cashier', assignedUnits: 'Outlet C', lastActive: '2023-12-11 09:45 AM', isDisable: false },
        { userId: '123', userName: 'Bob Johnson', userRoleId: 3, userRole: 'Cashier', assignedUnits: 'Outlet D, Outlet E', lastActive: '2023-12-11 11:15 AM', isDisable: false },
        { userId: '123', userName: 'Alice Miller', userRoleId: 4, userRole: 'Cashier', assignedUnits: 'Outlet F', lastActive: '2023-12-11 10:00 AM', isDisable: false },
        { userId: '123', userName: 'Charlie Brown', userRoleId: 5, userRole: 'Cashier', assignedUnits: 'Outlet G', lastActive: '2023-12-11 12:00 PM', isDisable: false }
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {

  }


}