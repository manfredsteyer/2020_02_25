import {Component} from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    
    const subj = new BehaviorSubject<string>('init');
    subj.subscribe(v => console.debug('v', v));

    subj.next('a');
    subj.next('b');
    subj.next('c');



  }
}

