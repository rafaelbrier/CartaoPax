import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { whiteSpace } from 'src/app/core/components/utils/validators/custom-validators';
import { SharedService } from 'src/app/core/services/shared-services';
import { UsersService } from 'src/app/core/services/users-service';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/core/components/utils/modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

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
  unknownError: boolean = false;

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
    this.unknownError = false;
    this.loginError = false;

    const values = this.loginForm.value;
    const loginData = {
      username: values.username,
      password: values.password
    };

    this.usersService.login(loginData)
      .subscribe((res) => {
        this.submitting = false;
        this.loginError = false;
        this.navigateToDashboard(true);
      }, (err) => {
        if(err.status != 401)
        {
          this.unknownError = true;
        } else {
          this.loginError = true;
        }
        this.submitting = false;
      })
  }

  loginFormBuilder(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, whiteSpace]],
      password: ['', [Validators.required, whiteSpace]]
    });
  }

  get f() { return this.loginForm.controls; }

  get v() { return this.loginForm.value; }

  navigateToDashboard(logInNow: boolean): void {
    logInNow ? location.href = '/dashboard/' :
               this.router.navigate(['/dashboard']);
  }

  logout() {
    this.usersService.logout();
  }

  openHelpModal() {
    this.modal.openModal('Senha',
    `<p class="text-info font-weight-bold">A senha é sua Data de Nascimento no formato DD/MM/YYYY. (Ex: 10/04/2018)</p>
    <p class="text-secondary">Caso não consiga acesso mesmo assim, favor contatar o administrador do Cartão Pax!</p>`)
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
