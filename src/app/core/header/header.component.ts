import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() pageName!: string;

  elem: any;
  nightModeIcon: boolean = false;
  isFullScreenMode: boolean = false;
  notificationsList: boolean = false;
  userList: boolean = false;
  userLogoutDialog: boolean = false;
  changePasswordModal: boolean = false;


  constructor(private router: Router, @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.elem = this.document.documentElement;
  }

  // header actions
  sidemenuToggle() {
    document.querySelector('.app-container')?.classList.toggle('open');
  }
  isNightMode() {
    this.nightModeIcon = !this.nightModeIcon;
    document.querySelector('body')?.classList.toggle('night-mode');
  }
  openFullscreen() {
    this.isFullScreenMode = true;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      this.elem.msRequestFullscreen();
    }
  }
  closeFullscreen() {
    this.isFullScreenMode = false;
    if (this.elem.exitFullscreen) {
      this.elem.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      this.document.msExitFullscreen();
    }
  }
  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  handleFullScreenChange(event: Event) {
    this.isFullScreenMode = !!(
      this.document.fullscreenElement ||
      this.document.mozFullScreenElement ||
      this.document.webkitFullscreenElement ||
      this.document.msFullscreenElement
    );
  }
  toggleUserNotifications() {
    this.notificationsList = !this.notificationsList;
  }
  closeUserNotifications() {
    this.notificationsList = false;
  }
  toggleUserList() {
    this.userList = !this.userList;
  }
  closeUserList() {
    this.userList = false;
  }

  // user options
  myProfile() {
    this.router.navigate(['/core/myprofile']);
  }
  passwordChangeRequest() {
    this.userList = false;
    this.changePasswordModal = true;
  }
  onModalClosed() {
    this.changePasswordModal = false;
  }
  closeChangePasswordModal() {
    this.changePasswordModal = false;
  }
  lockScreenRequest() {
    this.router.navigate(['/accesslocked']);
  }
  userLogoutRequest() {
    this.userList = false;
    this.userLogoutDialog = true;
  }
  onConfirmLogout() {
    this.userLogoutDialog = false;
    this.router.navigate(['/partnerlogin']);
  }
  onCancelLogout() {
    this.userLogoutDialog = false;
  }

}




