import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../dto/user';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private gblService: GlobalService) {

  }

  private loading: boolean = false;
  private error: boolean = false;
  private errorMessage: string = '';
  private username: string;
  private password: string;

  ngOnInit() {
  }

  login() {
    this.error = false;
    this.loading = true;
    let creds = { username: this.username, password: this.password }
    this.loginService.authenticateUser(creds).subscribe(
      response => {
        this.setGlobalUser(response);
        this.router.navigate(['home']);
        this.loading = false;
      },
      error => {
        this.error = true;
        console.log(error);
        this.errorMessage = error.message;
        this.loading = false;
      }
    );
  }

  setGlobalUser(response: any) {
    this.gblService.userId = response.user;
    this.gblService.jwtToken = response.token;
    localStorage.setItem('userId', this.gblService.userId);
    localStorage.setItem('jwtToken', this.gblService.jwtToken);
  }

  signup() {
    this.loading = false;
    console.log('signup');
  }
}