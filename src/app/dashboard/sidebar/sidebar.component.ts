import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users-service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  sideBarOpened: boolean;
  isMobile: boolean;

  constructor(private router: Router, private cdRef: ChangeDetectorRef,
              private usersService: UsersService) {
  }

  ngOnInit() {
    this.sideBarOpened = false;
    this.checkMobileOrDesktop(window.innerWidth);
    window.onresize = () => {
      this.checkMobileOrDesktop(window.innerWidth);
    };
  }

  ngAfterViewInit(): void {
    this.toggleSideBar("#sidenav");   
    this.cdRef.detectChanges();     
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

  logout() {
    this.usersService.logout();
  }

  goToHome() {
    this.router.navigate(["/"]);
  }
}
