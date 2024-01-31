import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders = [
    {
      orderId: '39630095167',
      orderStatusId: '1',
      orderStatus: 'New',
      orderedFrom: '2207',
      unitId: 'zxdsfdsgdfh',
      unitName: 'Outlet A',
      itemsTotalCount: '2',
      totalPrice: '198.00',
      orderDuration: '36 minutes',
      isReminderSent: true,
    },
    {
      orderId: '39630095168',
      orderStatusId: '1',
      orderStatus: 'New',
      orderedFrom: '3456',
      unitId: 'zxdsfdsgdfh',
      unitName: 'Outlet B',
      itemsTotalCount: '4',
      totalPrice: '767.00',
      orderDuration: '18 minutes',
      isReminderSent: false,
    },
    {
      orderId: '39630095174',
      orderStatusId: '1',
      orderStatus: 'New',
      orderedFrom: '1134',
      unitId: 'zxdsfdsgdfh',
      unitName: 'Outlet C',
      itemsTotalCount: '1',
      totalPrice: '165.00',
      orderDuration: '8 minutes',
      isReminderSent: false,
    },
    {
      orderId: '39630095177',
      orderStatusId: '1',
      orderStatus: 'New',
      orderedFrom: '1004',
      unitId: 'zxdsfdsgdfh',
      unitName: 'Outlet D',
      itemsTotalCount: '3',
      totalPrice: '489.00',
      orderDuration: '2 minutes',
      isReminderSent: false,
    },
  ];
  orderDetail = [
    {
      orderId: '39630095167',
      orderStatusId: '1',
      orderStatus: 'New',
      orderedFrom: '2207',
      orderedPersonName: 'Vishnu Anandababu',
      orderedPersonContact: '+91 9567583858',
      unitId: 'zxdsfdsgdfh',
      unitName: 'Outlet A',
      itemsTotalCount: '2',
      totalPrice: '198.00',
      orderDuration: '36 minutes',
      orderReceivedOn: 'Dec 12, 2023. 04:00 PM',
      isReminderSent: true,
      items: [
        {
          itemName: 'Prawn Tempura Spicy Hot',
          itemPrice: '399',
          itemTypeId: '2',
          itemOrderQty: '1',
          itemCategoryName: 'Appetizers',
          itemSubCategoryName: 'Non-Veg Main Course',
        },
        {
          itemName: 'Vegetable Spring Rolls',
          itemPrice: '249',
          itemTypeId: '1',
          itemOrderQty: '1',
          itemCategoryName: 'Appetizers',
          itemSubCategoryName: 'Veg Appetizers',
        }
      ]
    }
  ];

  // global variables
  public roleCode: string = environment.roleCode;
  public categoryTypeId: string[] = environment.categoryTypeId;
  // end global variables

  defaultInputValue = 25;
  activeOrder: any | null = null;

  openAcceptOrderModal: boolean = false;
  openRejectOrderModal: boolean = false;
  openReviseOrderModal: boolean = false;

  constructor(private fb: FormBuilder) { }

  // order form
  orderRejectForm = this.fb.group({
    categoryTypeId: ['']
  })
  controlClass(controlName: string) {
    return { 'is-invalid': this.orderRejectForm?.get(controlName)?.invalid && this.orderRejectForm?.get(controlName)?.touched };
  }

  ngOnInit(): void {

  }

  // general
  getOrderStatusColor(order: any): string {
    const minutes = parseInt(order.orderDuration.split(' ')[0]);
    if (minutes <= 15) {
      return 'placed';
    } else if (minutes <= 30) {
      return 'limited';
    } else {
      return 'exceed';
    }
  }
  inputHandleMinus() {
    if (this.defaultInputValue > 0) {
      this.defaultInputValue--;
    }
  }
  inputHandlePlus() {
    this.defaultInputValue++;
  }
  maskPhoneNumber(phoneNumber: string): string {
    if (this.roleCode === '3') {
      return phoneNumber.slice(-4).padStart(phoneNumber.length, 'X');
    } else {
      return phoneNumber;
    }
  }
  setActiveOrder(order: any): void {
    this.activeOrder = order;
  }

  // order accept
  onAcceptOrderRequest() {
    this.openAcceptOrderModal = true;
  }
  onConfirmOrderAccept() {

  }

  // order revice
  onReviseOrderRequest() {
    this.openReviseOrderModal = true;
  }
  onConfirmOrderRevice() {

  }

  // order reject
  onRejectOrderRequest() {
    this.openRejectOrderModal = true;
  }
  onConfirmOrderReject() {

  }

  // accept, revice, reject modal close
  onModalClosed() {
    this.openAcceptOrderModal = false;
    this.openReviseOrderModal = false;
    this.openRejectOrderModal = false;
  }

}

