import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  screenWidth: number;

  constructor() { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
    // set screenWidth on screen size change
    this.screenWidth = window.innerWidth;
  };
  }

}
