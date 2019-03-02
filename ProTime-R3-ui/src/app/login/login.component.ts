import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../base/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pt3-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(builder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.form = builder.group({
      user: [],
      password: []
    });
  }

  ngOnInit() {}

  login() {
    const c = this.form.controls;
    this.loginService.login(c.user.value, c.password.value).subscribe(e => {
      this.loginService.token = e.token;
      this.router.navigateByUrl('home');
    });
  }
}
