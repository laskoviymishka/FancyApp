/// <reference path="../../typings/tsd.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables}from 'angular2/router';
import {Inject} from 'angular2/di';
import {Http, httpInjectables} from 'angular2/http';

import {Home} from './components/home/home';
import {Value} from './components/value/value';
import {ValuesService} from './services/ValuesService';

@Component({
	selector: 'app',
	appInjector: [ValuesService, Http]
})
@RouteConfig([
	{ path: '/', component: Home, as: 'home' },
	{ path: '/value', component: Value, as: 'value' },
])
@View({
	templateUrl: './app.html?v=<%= VERSION %>',
	directives: [RouterOutlet, RouterLink]
})
class App { }

bootstrap(App, [routerInjectables, httpInjectables, ValuesService, Http]);