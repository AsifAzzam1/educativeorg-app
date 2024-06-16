import { Injectable } from "@angular/core";
import { BaseApi } from "../base.api";
import { LogInModel } from "../../models/Auth/login.model";
import { SessionModel } from "../../models/Auth/session.model";

@Injectable({
    providedIn:'root'
})
export class AuthApiService extends BaseApi{

    /**
     *
     */
    constructor() {
        super();       
    }

    public Login(input:LogInModel){
        return this.Login_POST_Request<SessionModel>(`${this.APIurl}/Account/SignIn`,input);
    }

}