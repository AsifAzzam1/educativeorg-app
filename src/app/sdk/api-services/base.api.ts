import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import { environment_dev } from "../../../environments/environment.development";
import { Observable, Subscriber, catchError, map, throwError } from "rxjs";
import { AnyObject } from "../global/types";
import { Router } from "@angular/router";
import { ApiResponseModel } from "../models/common/api.response.model";
import { LoginResponseModel } from "../models/Auth/login.model";

export abstract class BaseApi {

    protected APIurl = environment_dev.APIURL;
    private cancelToken: CancelTokenSource | null = null;
    private router = new Router();
    constructor() {
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
    protected GET_Request<T>(url: string): Observable<ApiResponseModel<T>> {
        return this.request('GET', url).pipe(map(res => res.data));
    }
    protected POST_Request<T>(url: string, postBody: AnyObject): Observable<ApiResponseModel<T>> {
        return this.request('POST', url, postBody).pipe(map(res => new ApiResponseModel<T>(res.data)));
    }

    protected Login_POST_Request<T>(url: string, postBody: AnyObject): Observable<LoginResponseModel<T>> {
        return this.request('POST', url, postBody).pipe(map(res => new LoginResponseModel<T>(res.data)));
    }
    protected PATCH_Request<T>(url: string, postBody: AnyObject): Observable<ApiResponseModel<T>> {
        return this.request('PATCH', url, postBody).pipe(map(res => res.data));
    }
    protected PUT_Request<T>(url: string, postBody: AnyObject): Observable<ApiResponseModel<T>> {
        return this.request('PUT', url, postBody).pipe(map(res => res.data));
    }
    protected DELETE_Request<T>(url: string): Observable<ApiResponseModel<T>> {
        return this.request('DELETE', url).pipe(map(res => res.data));
    }
    protected POST_FileRequest<T>(url: string, postBody: AnyObject): Observable<ApiResponseModel<T>> {
        return this.fileRequest('POST', url, postBody).pipe(map(res => res.data));
    }

    protected fileRequest(method: AxiosRequestConfig['method'], url: string, data: AnyObject = {}): Observable<AxiosResponse> {
        // Headers to be sent
        const headers: AxiosRequestConfig['headers'] = {
            'Content-Type': 'multipart/form-data',
            Authorization: this.authorize()
        };
        const options: AxiosRequestConfig = {
            method,
            url,
            headers,
            data
        };

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
        // return from(axios(options)).pipe(
        //     delay(0),
        //     map(Res => Res),
        //     catchError(e => this.handleError(e))
        // );
    }

    private authorize() {
        // const SessionValue = new UserSession().Session;

        // return `Bearer ${SessionValue ? SessionValue.JwtToken : ''}`;
        return '';
    }

    protected downloadRequest(method: AxiosRequestConfig['method'], url: string, data: AnyObject = {}): Observable<AxiosResponse> {
        const headers: AxiosRequestConfig['headers'] = {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: this.authorize()
        };
        const options: AxiosRequestConfig = {
            method,
            url,
            responseType: 'blob',
            data,
            headers
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