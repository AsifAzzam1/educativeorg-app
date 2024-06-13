import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import { environment_dev } from "../../../environments/environment.development";
import { Observable, Subscriber, catchError, map, throwError } from "rxjs";
import { AnyObject } from "../global/types";
import { Router } from "@angular/router";
import { ApiResponseModel } from "../models/common/api.response.model";

export abstract class BaseApi {

    private APIurl = environment_dev.APIURL;
    private cancelToken: CancelTokenSource | null = null;
    constructor(private router:Router) {
        this.cancelToken = axios.CancelToken.source();
    }

    private request(method: AxiosRequestConfig['method'], url: string, postBody: AnyObject = {}): Observable<AxiosResponse> {
        const headers: AxiosRequestConfig['headers'] = {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: ""
        };
        const options: AxiosRequestConfig = {
            method,
            url,
            headers,
            data: postBody
        };
        if (this.cancelToken) {
            options.cancelToken = this.cancelToken.token;
        }

        return new Observable((observer: Subscriber<any>) => {
            axios(options)
                .then(res => {
                    observer.next(res);
                    observer.complete();
                })
                .catch(err => {
                    observer.error(err);
                    observer.complete();
                });
        }).pipe(
            map(res => res),
            catchError(e => this.handleError(e))
        );
    }

    protected POST_Request<T>(url: string, postBody: AnyObject): Observable<ApiResponseModel<T>> {
        return this.request('POST', url, postBody).pipe(map(res => new ApiResponseModel<T>(res.data)));
    }
    
    private handleError(error: AxiosError) {
       
        if (error.response?.status == 401) {
            this.cancelToken?.cancel();
            if (this.router.url !== '/login') {
                this.router.navigate(['/login']);
            }
        }

        return throwError(error.response!.data || 'Internal Server Error');
    }
}