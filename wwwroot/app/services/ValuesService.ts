import {Inject, Http} from 'angular2/angular2';
import {Observable} from 'rx';
import {IValue} from '../models/model';

const API_URL = 'http://localhost:5001/api/';
const VALUES_API_NAME = "Values/";

export class ValuesService {
	constructor(@Inject(Http) private http: Http) {
		console.log("create values service");
	}

	getValues(): Rx.Observable<Array<IValue>> {
		return this.http.get(API_URL + VALUES_API_NAME).toRx().map(res => res.json());
	}

	getValue(id: number): Rx.Observable<IValue> {
		return this.http.get(API_URL + VALUES_API_NAME + id).toRx();
	}

	addValue(value: IValue) {
		this.http.post(API_URL + VALUES_API_NAME, value);
	}

	updateVaue(id: number, value: IValue) {
		this.http.put(API_URL + VALUES_API_NAME + id, value);
	}

	deleteValue(id: number) {
		this.http.delete(API_URL + VALUES_API_NAME + id);
	}
}