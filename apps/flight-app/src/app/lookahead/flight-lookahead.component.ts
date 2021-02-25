import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { combineLatest, from, interval, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { Flight } from '@flight-workspace/flight-lib';

@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})
export class FlightLookaheadComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    control: FormControl;
    flights$: Observable<Flight[]>;
    loading = false;

    //online: boolean = false;    
    online$: Observable<boolean>;


    ngOnInit() {

        this.control = new FormControl();

        const input$ = this.control.valueChanges.pipe(
            debounceTime(300)
        )

        this.online$ 
            = interval(2000).pipe(  // ..1..2..3..4
                    startWith(0), // 0..1..2..3..4
                    map(_ => Math.random() < 0.5), // t, t, t, f, f
                    distinctUntilChanged(),// t, f
                    shareReplay({bufferSize: 1, refCount : true})
                    //tap(value => this.online = value)
        );

        this.flights$ = combineLatest([input$, this.online$]).pipe(
            filter( ([_, online]) => online ),
            map( ([input, _]) => input ),
            tap(v => this.loading = true),
            switchMap(name => this.load(name)),
            tap(v => this.loading = false)
        )

        // from([1,2,3,4,5]).toPromise().then(v => console.debug('V', v));


        // this.flights$ = this
        //                     .control
        //                     .valueChanges
        //                     .pipe(
        //                       
                             
        //                     );
    }

    load(from: string)  {
        const url = "http://www.angular.at/api/flight";

        const params = new HttpParams()
                            .set('from', from);

        const headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this.http.get<Flight[]>(url, {params, headers});

    };


}
