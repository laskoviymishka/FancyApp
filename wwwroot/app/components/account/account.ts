/// <reference path="../../../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {AccountService} from '../../services/AccountService';

@Component({
	selector: 'account'
})
@View({
	templateUrl: './components/account/account.tpl.html'
})
export class Account {
	constructor(public accountService: AccountService) {
		console.log("create account component");
	}

	signUp(userName: string, password: string) {
		this.accountService.signUp(userName, password).subscribe(response => {
			console.log(response);
		});
	}
}
