/// <reference path="../../typings/tsd.d.ts" />
import {Component, View, bootstrap, httpInjectables, Inject} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables}from 'angular2/router';

import {Home} from './components/home/home';
import {Account} from './components/account/account';
import {ValueComponent} from './components/value/value';

import {ValuesService} from './services/ValuesService';
import {AccountService} from './services/AccountService';

var appInjectables: any[] = [ValuesService, AccountService];

@Component({
	selector: 'app',
	appInjector: [appInjectables, httpInjectables]
})
@RouteConfig([
	{ path: '/', component: Home, as: 'home' },
	{ path: '/value', component: ValueComponent, as: 'value' },
	{ path: '/account', component: Account, as: 'account' },
])
@View({
	templateUrl: './app.html',
	directives: [RouterOutlet, RouterLink]
})
class App { }


bootstrap(App, [appInjectables, routerInjectables, httpInjectables]);