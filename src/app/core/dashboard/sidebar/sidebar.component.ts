import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  sideBarOpened: boolean;
  isMobile: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.sideBarOpened = false;
    this.checkMobileOrDesktop(window.innerWidth);
    window.onresize = () => {
      this.checkMobileOrDesktop(window.innerWidth);
    };
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.toggleSideBar("#sidenav");  
      
    }  

  toggleSideBar(sidenav: any) {
    if (!this.isMobile) {
      this.sideBarOpened = !this.sideBarOpened;
    } else {
      sidenav.toggle();
    }
  }

  checkMobileOrDesktop(screenWidth: number) {
    if (screenWidth > 768)
      this.isMobile = false;
    else
      this.isMobile = true;
  }

  logOut() {
    this.router.navigate(['/']);
  }
}
