import {Component, View, NgFor} from 'angular2/angular2';
import {ValuesService} from '../../services/ValuesService';

@Component({
	selector: 'values'
})
@View({
	templateUrl: './components/value/value.tpl.html?v=<%= VERSION %>',
	directives: [NgFor]
})
export class Value {
	values: Array<string>;

	constructor(public valuesService: ValuesService) {
		console.log("create values component");
		this.values = new Array<string>();
	}

	addValue(newname) {
		console.log(newname.value);
		this.values.push(newname.value);
		newname.value = null;
	}
}