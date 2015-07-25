/// <reference path="../../../../typings/tsd.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import {ValuesService} from '../../services/ValuesService';
import {Value, IValue} from '../../models/model';

@Component({
	selector: 'values'
})
@View({
	templateUrl: './components/value/value.tpl.html',
	directives: [NgFor]
})
export class ValueComponent {
	values: Array<IValue>;
	error: string = "";

	constructor(public valuesService: ValuesService) {
		console.log("create values component");
		this.values = new Array<IValue>();
		this.refreshValues();
	}

	refreshValues() {
		this.valuesService.getValues().subscribe(response => {
			this.values = response;
			console.log(this.values);
		});
	}

	removeValue(index: number) {
		this.valuesService.deleteValue(index).subscribe(_ => {
			this.refreshValues();
		});
	}

	addValue(newname) {
		this.valuesService.addValue(new Value(newname.value, 0)).subscribe(_ => {
			this.refreshValues();
		});

		newname.value = null;
	}
}