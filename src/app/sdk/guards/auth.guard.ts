import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/authServices/session.service';

export const NotLoggedIn: CanActivateFn = (route, state) => {

 const _sessionService = inject(SessionService);
 const _router = inject(Router);
 const isLoggedIN = _sessionService.CheckLogin();
//  alert('login from notloggedin '+ isLoggedIN);
   if(isLoggedIN)
   {
     _router.navigateByUrl('apps/dashboard');
     return false;
   }
   return true;
};

export const LoggedIn: CanActivateChildFn = (route, state) => {

  const _sessionService = inject(SessionService);
  const _router = inject(Router);
  const isLoggedIN = _sessionService.CheckLogin();
  // alert('login from loggedin '+ isLoggedIN);
    if(!isLoggedIN)
    {
      _router.navigateByUrl('login');
      return false;
    }
    return true;
 };

 export const LoggedInChild: CanActivateChildFn = (route, state) => {

  const _sessionService = inject(SessionService);
  const _router = inject(Router);
  const isLoggedIN = _sessionService.CheckLogin();
  // alert('login from loggedinchild '+ isLoggedIN);
    if(!isLoggedIN)
    {
      _router.navigateByUrl('login');
      return false;
    }
    return true;
 };
