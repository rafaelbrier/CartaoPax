import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  screenWidth: number;
  sideBarOpened: boolean;
  expandSideNav: boolean;

  constructor() {
   }

  ngOnInit() {
    this.sideBarOpened = false;

    this.screenWidth = window.innerWidth;
    window.onresize = () => {
    this.screenWidth = window.innerWidth;
  };
  }

  toggleSideBar(sidenav: any) {
    if(this.screenWidth > 768) {
    this.sideBarOpened = !this.sideBarOpened;
    } else {
      sidenav.toggle();
    }
  }  
}
