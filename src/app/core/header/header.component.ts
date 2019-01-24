import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isNavBarCollapsed: boolean;
  showPassword: boolean = false;

  isLoginCollapsed: boolean = false;

  constructor(private router: Router) {
    this.isNavBarCollapsed = true;
  }

  ngOnInit(): void {   
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  @HostListener('window:scroll')
  shrinkMenu() {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      document.getElementById("navbar-logo").classList.add("navbar-logo");
      document.getElementById("navbar").style.opacity = '0.5';
    } else {
      document.getElementById("navbar-logo").classList.remove("navbar-logo");
      document.getElementById("navbar").style.opacity = '1';
    }
  }
}
