import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-error',
  templateUrl: './app-error.component.html',
  styleUrls: ['./app-error.component.scss']
})
export class AppErrorComponent implements OnInit {
  isMobileView = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenWidth();
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    if (typeof window !== 'undefined') {
      this.isMobileView = window.innerWidth <= 767;
    }
  }

  btnGetBackToHome() {
    this.router.navigate(['/core/dashboard']);
  }

}

