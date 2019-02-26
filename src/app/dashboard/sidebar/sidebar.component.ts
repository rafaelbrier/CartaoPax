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
  }

  ngAfterViewInit(): void {
    this.sideBarOpened = false;
    this.handleSidenavResponsivity(window.innerWidth);
    window.onresize = () => {
      this.handleSidenavResponsivity(window.innerWidth);
    };
  }

  toggleSideBar(sidenav: any) {
    if (!this.isMobile) {
      this.sideBarOpened = !this.sideBarOpened;
    } else {
      sidenav.toggle();
    }
  }

  handleSidenavResponsivity(screenWidth: number) {
    if (screenWidth > 768)
      this.isMobile = false;
    else
      this.isMobile = true;

    if (!this.isMobile) {
      this.toggleSideBar("#sidenav");
    } else {
      document.getElementById("sidenav").classList.add("scale-sidenav");
    }
    this.cdRef.detectChanges();
  }

  logout() {
    this.usersService.logout();
  }

  goToHome() {
    this.router.navigate(["home"]);
  }
}
