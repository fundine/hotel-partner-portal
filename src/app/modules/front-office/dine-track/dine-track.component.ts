import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dine-track',
  templateUrl: './dine-track.component.html',
  styleUrls: ['./dine-track.component.scss']
})
export class DineTrackComponent implements OnInit {

  dineGuestInfo = [
    {
      roomCategory: 'Super Deluxe Room',
      items: [
        {
          roomNumber: '2005',
          guestName: 'Vishnu Anandababu',
          roomName: 'Super Deluxe Room',
          adultsCount: '2',
          childCount: '1',
          pendingAdultsCount: '2',
          pendingChildCount: '1',
          roomTelephoneNo: '2005',
          servedDateTime: '',
          isBreakfastServed: false
        },
        {
          roomNumber: '2006',
          guestName: 'Ankush S',
          roomName: 'Super Deluxe Room',
          adultsCount: '2',
          childCount: '1',
          pendingAdultsCount: '0',
          pendingChildCount: '0',
          roomTelephoneNo: '2005',
          servedDateTime: 'Jan 12, 2024. 07:45 PM',
          isBreakfastServed: true
        }
      ]
    },
    {
      roomCategory: 'Diplomatic Suite',
      items: [
        {
          roomNumber: '2005',
          guestName: 'Nikhel Antony Auguestine',
          roomName: 'Diplomatic Suite',
          adultsCount: '1',
          childCount: '0',
          pendingAdultsCount: '1',
          pendingChildCount: '0',
          roomTelephoneNo: '2005',
          servedDateTime: '',
          isBreakfastServed: false
        }
      ]
    }
  ];

  roomInfo: {
    roomNo: string;
    guestName: string;
    pendingAdultsCount: number;
    pendingChildCount: number;
  } = { roomNo: '', guestName: '', pendingAdultsCount: 0, pendingChildCount: 0 };
  defaultInputValues: { [key: string]: number } = { adult: 0, child: 0 };
  markAttendanceModal: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  // general
  onConfirmGuestAttendance(item: any) {
    this.roomInfo = {
      roomNo: item.roomNumber,
      guestName: item.guestName,
      pendingAdultsCount: +item.pendingAdultsCount,
      pendingChildCount: +item.pendingChildCount,
    };
    this.markAttendanceModal = true;
  }

  onModalClosed() {
    this.markAttendanceModal = false;
  }

  // input handle 
  inputHandleMinus(type: string) {
    if ((type === 'pendingAdultsCount' || type === 'pendingChildCount') && this.roomInfo[type] > 0) {
      this.roomInfo[type] = (this.roomInfo[type] as number) - 1;
    }
  }
  inputHandlePlus(type: string) {
    if (type === 'pendingAdultsCount' || type === 'pendingChildCount') {
      this.roomInfo[type] = (this.roomInfo[type] as number) + 1;
    }
  }
  // inputHandlePlus(type: string) {
  //   if ((type === 'pendingAdultsCount') && this.roomInfo[type] < this.dineGuestInfo.get('pendingAdultsCount')?.value) {
  //     this.roomInfo[type] = this.roomInfo[type] + 1;
  //   } else if ((type === 'pendingChildCount') && this.roomInfo[type] < this.dineGuestInfo.get('pendingChildCount')?.value) {
  //     this.roomInfo[type] = this.roomInfo[type] + 1;
  //   }
  // }


  // count 
  categoryTotalCount(category: any): string {
    const totalCount = category.items.length;
    return totalCount < 10 ? `0${totalCount}` : `${totalCount}`;
  }

  // save guest attendance
  markGuestAttendance() {

  }

}
