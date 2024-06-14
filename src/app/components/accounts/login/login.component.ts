import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { LogInModel } from '../../../sdk/models/login.model';

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
