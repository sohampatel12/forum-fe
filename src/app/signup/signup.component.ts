import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private signupService: SignupService) { }

  private loading: boolean = false;
  private username: string;
  private password: string;
  private email: string;
  private confirmPassword: string;
  private error: boolean = false;
  private errorMessage: string = '';
  private user;

  signup() {
    this.loading = true;
    if(this.password === this.confirmPassword) {
      let user = { username: this.username, password: this.password, email: this.email };
      this.signupService.createUser(user).subscribe(
        response => {
          this.user = response;
          console.log(this.user);
          this.loading = false;
        },
        error => {
          this.error = true;
          console.log(error);
          this.errorMessage = error.message;
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
      this.error = true;
      this.errorMessage = 'The passwords do no match.';
    }
  }
}
