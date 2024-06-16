import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { LogInModel } from '../../../sdk/models/Auth/login.model';
import { AuthApiService } from '../../../sdk/api-services/Auth/auth.apiservices';
import { SessionModel } from '../../../sdk/models/Auth/session.model';
import { SessionService } from '../../../sdk/services/authServices/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _authService:AuthApiService,private _sessionService:SessionService,private router:Router) {
    
    
  }

  LoginData: LogInModel = new LogInModel();
  Session:SessionModel|null= null;


  Login(input:NgForm){
    // console.log(input);
    // console.log(input.form.valid ? "valid" : "invalid");
    // console.log(this.LoginData);
    this._authService.Login(this.LoginData).subscribe(res => {
      if(res.Success){
        this.Session = res.Data!;
        this._sessionService.Save(this.Session);
        this.router.navigateByUrl('apps/dashboard');
      }
      else{
        alert(res.Message);
      }
    });
  }



}
