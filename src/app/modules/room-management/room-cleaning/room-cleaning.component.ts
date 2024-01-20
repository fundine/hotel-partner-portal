import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-cleaning',
  templateUrl: './room-cleaning.component.html',
  styleUrls: ['./room-cleaning.component.scss']
})
export class RoomCleaningComponent implements OnInit {

  qrCodeUrl: string = 'http://';

  constructor() { }

  ngOnInit(): void {

  }
}
