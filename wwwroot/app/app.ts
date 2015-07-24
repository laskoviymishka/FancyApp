/// <reference path="../../typings/tsd.d.ts" />
import {Component, View, bootstrap, httpInjectables} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables}from 'angular2/router';
import {Inject} from 'angular2/di';

import {Home} from './components/home/home';
import {ValueComponent} from './components/value/value';
import {ValuesService} from './services/ValuesService';

@Component({
	selector: 'app',
	appInjector: [ValuesService, httpInjectables]
})
@RouteConfig([
	{ path: '/', component: Home, as: 'home' },
	{ path: '/value', component: ValueComponent, as: 'value' },
])
@View({
	templateUrl: './app.html',
	directives: [RouterOutlet, RouterLink]
})
class App { }

bootstrap(App, [routerInjectables, httpInjectables, ValuesService]);