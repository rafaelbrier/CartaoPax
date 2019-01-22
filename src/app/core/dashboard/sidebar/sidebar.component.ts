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
    // set screenWidth on screen size change
    this.screenWidth = window.innerWidth;
  };
  }
  
  mouseEnterHandler(sidenav: any) {
    if(!this.sideBarOpened)
    sidenav.open();
  }

  mouseLeaveHandler(sidenav: any) {
    if(!this.sideBarOpened)
    sidenav.close();
  }
}
