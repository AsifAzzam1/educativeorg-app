import { Component } from '@angular/core';
import { LogInModel } from '../../../models/logininputviewmodel.model';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor() {
    
  }
  LoginData: LogInModel = new LogInModel();
  Login(input:NgForm){
  console.log(input);
  console.log(input.form.valid ? "valid" : "invalid");
  console.log(this.LoginData);
}

}
