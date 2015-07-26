/// <reference path="../../../typings/tsd.d.ts" />

import {Inject, Injectable, Http, RequestOptions} from 'angular2/angular2';
import {Observable} from 'rx';

const API_URL = 'http://localhost:5001/api/';
const ACCOUNT_API_NAME = "Account/";
const SIGN_UP = "SignUp"
const SIGN_IN = "SignIn"
const SIGN_OUT = "SignOut"

@Injectable()
export class AccountService {
	constructor(private http: Http, private options: RequestOptions) {
		this.options.headers.set("Content-Type", "application/json");
		console.log("create account service");
	}

	getAccounts(): Rx.Observable<Array<any>> {
		return this.http.get(API_URL + ACCOUNT_API_NAME).toRx().map(res => res.json());
	}

	getAccount(id: string): Rx.Observable<any> {
		return this.http.get(API_URL + ACCOUNT_API_NAME + id).toRx();
	}

	signUp(userName: string, password: string): Rx.Observable<any> {
		return this.http.post(
			API_URL + ACCOUNT_API_NAME + SIGN_UP,
			JSON.stringify({
				userName: userName,
				password: password
			}),
			this.options).toRx();
	}

	signIn(userName: string, password: string): Rx.Observable<any> {
		console.log(userName, password);
		return this.http.post(
			API_URL + ACCOUNT_API_NAME + SIGN_IN,
			JSON.stringify({
				userName: userName,
				password: password
			}),
			this.options).toRx();
	}

	signOut(): Rx.Observable<any> {
		return this.http.post(API_URL + ACCOUNT_API_NAME + SIGN_OUT, "", this.options).toRx();
	}
}