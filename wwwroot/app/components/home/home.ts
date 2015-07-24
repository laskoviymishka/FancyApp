import {Component, View} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'home'
})
@View({
  templateUrl: './components/home/home.tpl.html',
  directives: [RouterLink]
})
export class Home {
  constructor() {
    console.log("create home component");
  }
}
