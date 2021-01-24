import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService ) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(next => {    
      //console.log('Logged in successfully');//class 314
      this.alertify.success('Logged in Successfully');
      console.log(this.model);
    }, error => {
      //console.log('Failed to login');
      //console.log(error);//class 314
      this.alertify.error(error);
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    //console.log('logged out');//class 314
    this.alertify.message('logged out');
  }
}
