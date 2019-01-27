import { Component, HostListener, OnInit } from '@angular/core';
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

  phoneElement: HTMLElement;

  constructor(private router: Router) {
    this.isNavBarCollapsed = true;
  }

  ngOnInit(): void {   
    if(window.innerWidth < 1350)
    document.getElementById("telephone").remove();
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  @HostListener('window:scroll')
  shrinkMenu() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.getElementById("card").classList.add("card-after-scroll");
      document.getElementById("navbar-logo").classList.add("navbar-logo");
      document.getElementById("navbar").classList.add("navbar-opacity");
    } else {
      document.getElementById("card").classList.remove("card-after-scroll");
      document.getElementById("navbar-logo").classList.remove("navbar-logo");
      document.getElementById("navbar").classList.remove("navbar-opacity");
    }
  }
}
