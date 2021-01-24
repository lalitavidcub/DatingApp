import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ErrorInterceptor } from 'src/app/_services/error.interceptor';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;//303 tutorial
  @Output() cancelRegister = new EventEmitter();//ver esto 12202020
 
  model: any = {};
  objError: any;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      //console.log('Registration successful');//class 314
      this.alertify.success('Registration successful');
    }, error => {
      //console.log("error from register: \n" + error.errors.Password);//class 314
      if(typeof error.errors === 'object')
      {
        if(error.errors.Password != null)
        {
          this.alertify.errorObj(error.errors.Password.toString());
        }
        else if(error.errors.Username != null)
        {
          this.alertify.errorObj(error.errors.Username.toString());
        }
      }
      else if(typeof error.errors != 'object')
      {
        this.alertify.errorObj(error);
      }
      
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    //console.log('cancelled');//class 314
    this.alertify.message('cancelled');
  }

}