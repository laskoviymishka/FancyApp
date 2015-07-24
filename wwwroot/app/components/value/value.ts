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
	error: string = "";

	constructor(public valuesService: ValuesService) {
		console.log("create values component");
		this.values = new Array<string>();
		this.refreshValues();
	}

	refreshValues() {
		this.valuesService.getValues().subscribe(response => {
			this.values = response;
		});
	}

	removeValue(index: number) {
		this.valuesService.deleteValue(index);
		this.refreshValues();
	}

	addValue(newname) {
		this.valuesService.addValue(newname.value);
		this.refreshValues();
		newname.value = null;
	}
}