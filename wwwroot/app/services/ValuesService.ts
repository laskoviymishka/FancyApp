import {Http, httpInjectables} from 'angular2/http';
import {Observable} from 'rx';

export class ValuesService {
	constructor(public http: Http) {
		console.log("create values service");
	}
	
	getValues() {
		
	}
	
	getValue(id: number) {
		
	}
	
	addValue(value: string){
		
	}	
	
	updateVaue(id: number, value: string){
		
	}
	
	deleteValue(id: number){
		
	}
}