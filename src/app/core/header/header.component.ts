import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isNavBarCollapsed: boolean;

  constructor() { 
    this.isNavBarCollapsed = true;   
   }

  ngOnInit() {
  }
  
  @HostListener('window:scroll')
  shrinkMenu() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      document.getElementById("navbar-logo").classList.add("navbar-logo");
      document.getElementById("navbar").style.opacity = '0.5';
    } else {
      document.getElementById("navbar-logo").classList.remove("navbar-logo");
      document.getElementById("navbar").style.opacity = '1';
    }
  }
}
