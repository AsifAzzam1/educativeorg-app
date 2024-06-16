import { Component } from '@angular/core';
import { SessionService } from '../../sdk/services/authServices/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'apps',
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.css'
})
export class AppsComponent {
  
  constructor(private _sessionService:SessionService) {
  
  }

  Logout(){
    this._sessionService.ClearSession();
  }
}
