import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = '';
  password = '';
  submitted = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.removeItem('userName');
  }

  onSubmit() {
    this.submitted = true;
    if (this.validateDetail()) {
      this.submitted = false;
      localStorage.setItem('userName', this.userName);
      this.router.navigate(['dashboard']);
    }

  }

  validateDetail() {
    let valid = false;
    let Msg = '';

    if (this.userName !== 'TestUser') {
      Msg += 'User Name is incorrect';
    }

    if (this.password !== 'Password123') {
      Msg += 'Password is incorrect';
    }

    if (Msg != '') {
      alert(Msg);
    } else {
      valid = true;
    }
    return valid;
  }

}
