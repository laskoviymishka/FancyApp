/// <reference path="../../../typings/tsd.d.ts" />

import {Inject, Http} from 'angular2/angular2';
import {Observable} from 'rx';
import {IValue} from '../models/model';

const API_URL = 'http://localhost:5001/api/';
const VALUES_API_NAME = "Values/";

export class ValuesService {
	constructor( @Inject(Http) private http: Http) {
		console.log("create values service");
	}

	getValues(): Rx.Observable<Array<IValue>> {
		return this.http.get(API_URL + VALUES_API_NAME).toRx().map(res => res.json());
	}

	getValue(id: number): Rx.Observable<IValue> {
		return this.http.get(API_URL + VALUES_API_NAME + id).toRx();
	}

	addValue(value: IValue): Rx.Observable<any> {
		return this.http.post(API_URL + VALUES_API_NAME + "?Value=" + value.Value, JSON.stringify(value)).toRx();
	}

	updateVaue(id: number, value: IValue): Rx.Observable<any> {
		return this.http.put(API_URL + VALUES_API_NAME + id, JSON.stringify(value)).toRx();
	}

	deleteValue(id: number): Rx.Observable<any> {
		return this.http.delete(API_URL + VALUES_API_NAME + id).toRx();
	}
}