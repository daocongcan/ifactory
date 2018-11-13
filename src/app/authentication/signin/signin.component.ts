import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Login } from '../../api/models/login';
import swal from 'sweetalert2';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  user: Login = new Login();

  encrypted = "";
  decrypted ="";
  key="dfmsecret";
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.spinnerService.hide();

  }

  onLogin(): void {

    // Encrypted password 
    this.encrypted = CryptoJS.AES.encrypt(this.user.password, this.key).toString();
    // console.log(this.encrypted);
    
    this.auth.login(this.user.name_user, this.encrypted)
      .subscribe(
        data => {
          console.log(data);
          console.log('User is logged in');
          this.router.navigate(['/']);

        },
        error => {
          console.log('Login failed');
          swal('Oops...', 'Username or password is wrong', 'error');
        }
      );
    localStorage.setItem('token', 'abc');
    this.router.navigate(['/']);
  }
}
