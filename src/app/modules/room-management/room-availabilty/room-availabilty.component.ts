import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-availabilty',
  templateUrl: './room-availabilty.component.html',
  styleUrls: ['./room-availabilty.component.scss']
})
export class RoomAvailabiltyComponent implements OnInit {

  roomAvailability = [
    {
      blockName: 'Main Block',
      floorNumber: 'Floor 1',
      items: [
        { roomStatusId: '2', roomStatus: 'occupied', roomNumber: '2006' },
        { roomStatusId: '1', roomStatus: 'free', roomNumber: '2007' },
        { roomStatusId: '2', roomStatus: 'occupied', roomNumber: '2006' },
        { roomStatusId: '1', roomStatus: 'free', roomNumber: '2007' },
        { roomStatusId: '3', roomStatus: 'cleaning', roomNumber: '2008' },
        { roomStatusId: '1', roomStatus: 'free', roomNumber: '2007' },
        { roomStatusId: '1', roomStatus: 'free', roomNumber: '2007' },
        { roomStatusId: '2', roomStatus: 'occupied', roomNumber: '2006' },
        { roomStatusId: '4', roomStatus: 'maintenance', roomNumber: '2006' },
        { roomStatusId: '5', roomStatus: 'blocked', roomNumber: '2006' }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {
    
  }
}
