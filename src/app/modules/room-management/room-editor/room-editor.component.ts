import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-editor',
  templateUrl: './room-editor.component.html',
  styleUrls: ['./room-editor.component.scss']
})
export class RoomEditorComponent implements OnInit {

  showAllRoomsList: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  toggleRoomAvailability() {
    this.showAllRoomsList = !this.showAllRoomsList
  }

  onAddNewRoom() {   
    this.router.navigate(['/core/roomeditor/quickadd']);
  }
}
