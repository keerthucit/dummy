import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  public bearerToken: any;
  public submitMessage: string;
  public userLogname: string;
  constructor(private authService: AuthenticationService,
    private routerService: RouterService) {
  }
  loginSubmit() {
    const user: any = { username: this.username.value, password: this.password.value };
    console.log('loginuser',this.username.value);
    this.userLogname =this.username.value;
    if (this.username.hasError('required') || this.password.hasError('required')) {
      this.submitMessage = 'Username and Password required';
    } else {
      this.authService.authenticateUser(user).subscribe(
        res => {
          this.bearerToken = res['token'];
          this.authService.setBearerToken(this.bearerToken);
          sessionStorage.setItem('loggedUser', this.userLogname);
          this.routerService.routeToDashboard();
        },
        err => {
          if (err.status === 404) {
            this.submitMessage = err.message;
          } else {
            this.submitMessage = err.error.message;
          }
        });
    }
  }
}
