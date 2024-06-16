import { Injectable, inject } from "@angular/core";
import { SessionModel } from "../../models/Auth/session.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class SessionService{

    /**
     *
     */
    constructor(private _router:Router) {        
    }

    Save(input:SessionModel){
        Object.keys(input).forEach(key => {
            const value:string|null = input[key as keyof SessionModel] as string|null;
            localStorage.setItem(key,value ?? '');
        });
        // localStorage.setItem('UserId',input.UserId!);
        // localStorage.setItem('FirstName',input.FirstName!);
        // localStorage.setItem('LastName',input.LastName!);
        // localStorage.setItem('Token',input.Token!);
        // localStorage.setItem('Expiry',input.Expiry!);
        // localStorage.setItem('CompanyId',input.CompanyName!);
        // localStorage.setItem('CompanyName',input.CompanyName!);
    }

    GetSession():SessionModel{
        let session = new SessionModel();
        Object.keys(session).forEach(key => {
            const value:string|null = session[key as keyof SessionModel] as string|null;
            session[key as keyof SessionModel] = localStorage.getItem(key) !== null  ? 
                                                        localStorage.getItem(key) : null;
                                                        // console.log("getting session ",localStorage.getItem(key));
                                                        // console.log("for key ",key);
        });
        // console.log(session);
        return session;
    }

    ClearSession(){
        const input = new SessionModel();
        Object.keys(input).forEach(key => {
            localStorage.removeItem(key);
        });
        this._router.navigateByUrl('login');
    }

    CheckLogin():boolean{
        // alert(this.GetSession().UserId);
        const userid = this.GetSession().UserId;
        return userid !== null && userid !== '';
    }

}