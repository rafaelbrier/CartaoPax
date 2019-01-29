import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { whiteSpace } from 'src/app/core/components/utils/validators/custom-validators';
import { SharedService } from 'src/app/core/services/shared-services';
import { UsersService } from 'src/app/core/services/users-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAnyUserLogged: boolean = false;
  userSubscription: Subscription;

  isNavBarCollapsed: boolean;
  showPassword: boolean = false;

  isLoginCollapsed: boolean = false;

  phoneElement: HTMLElement;

  // Login
  loginForm: FormGroup;
  submitting: boolean = false;
  loginError: boolean = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private usersService: UsersService) {
    this.isNavBarCollapsed = true;
  }

  ngOnInit(): void {
    if (window.innerWidth < 1350)
      document.getElementById("telephone").remove();

    this.userSubscription = this.usersService.currentUser.subscribe(u => {
      this.isAnyUserLogged = u ? true : false;
    });

    this.loginFormBuilder();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  submitLoginForm(): void {
    this.sharedService.triggerValidation(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }

    this.submitting = true;
    this.loginError = false;

    const values = this.loginForm.value;
    const loginData = {
      username: values.username,
      password: values.password
    };

    this.usersService.login(loginData)
      .subscribe(() => {
        this.submitting = false;
        this.loginError = false;
        this.router.navigate(["dashboard"]);
      }, () => {
        this.submitting = false;
        this.loginError = true;
      })
  }

  loginFormBuilder(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, whiteSpace]],
      password: ['', [Validators.required, whiteSpace]]
    });
  }

  get f() { return this.loginForm.controls; }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.usersService.logout();
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
