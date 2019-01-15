import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  @HostListener('window:scroll')
  shrinkMenu() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      document.getElementById("navbar-logo").classList.add("navbar-logo") 
    } else {
      document.getElementById("navbar-logo").classList.remove("navbar-logo");
    }
  }
}
