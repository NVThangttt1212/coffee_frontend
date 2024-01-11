import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {AuthenticationService} from "../../core/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentLanguage: string;
  hidePassword: boolean = true;
  test: any;
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
              private translateService: TranslateService,
              private router: Router,
              private authentication : AuthenticationService,
              private loginService: LoginService) {
    this.currentLanguage = this.translateService.currentLang;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  onSubmit(): void {
    const res: any = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.loginService.login(res).subscribe(
      response => {
        if (response.login) {
          localStorage.setItem('email', response.email);
          localStorage.setItem('authToken', response.authToken);
          this.loginService.getUserInfo(localStorage.getItem('email')).subscribe(
            req =>{
              console.log(req)
              localStorage.setItem('position', req.userData?.position);
              localStorage.setItem('id_user', req.userData?.user_id);
              localStorage.setItem('first_name', req.userData?.first_name);
              localStorage.setItem('last_name', req.userData?.last_name);
              this.router.navigate(['/manage']);
            }
          )
        } else {
          alert('Tài khoản hoặc mật khẩu không chính xác!');
        }
      },
      error => {
        console.log('Lỗi:', error);
      }
    );
  }



  handleLang(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'vi' : 'en';
    this.translateService.use(this.currentLanguage);
  }
}
