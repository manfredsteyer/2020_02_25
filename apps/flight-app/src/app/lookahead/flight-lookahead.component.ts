import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, combineLatest, from, interval, Observable, of, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { catchError, concatMap, debounceTime, delay, distinctUntilChanged, exhaustMap, filter, map, mergeMap, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Flight } from '@flight-workspace/flight-lib';

function log(o) {
    return o.pipe(tap(x => console.debug('log', x)));
    // o.subscribe(x => console.debug('log', x));
    // return of([]);
}

function betterLog(label: string) {
    console.debug('set up logger', label);
    return function(o) {
        return o.pipe(tap(v => console.debug('log', label, v)));
    }
}

function myTap(f: Function) {
    return function(source) {
        return new Observable((sender) => {

            const subscr = source.subscribe({
                next: (v) => {
                    f(v);
                    sender.next(v)
                },
                error: (e) => {
                    sender.error(e)
                },
                complete: () => {
                    sender.complete();
                }
                
            });

            return () => {
                subscr.unsubscribe();
            };

        });

    }
}


@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})
export class FlightLookaheadComponent 
    implements OnInit, OnDestroy {

    closeSubj = new Subject<void>();

    control: FormControl;
    flights$: Observable<Flight[]>;
    loading = false;
    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    //online: boolean = false;    
    online$: Observable<boolean>;

    constructor(private http: HttpClient) {
    }
    ngOnDestroy(): void {
        this.closeSubj.next();
    }

    ngOnInit() {

        // this.loading$.pipe()

        this.control = new FormControl();

        const input$ = this.control.valueChanges.pipe(
            filter(v => v.length >= 2),
            debounceTime(300)
        )

        this.online$ 
            = interval(2000).pipe(  // ..1..2..3..4
                    startWith(0), // 0..1..2..3..4
                    map(_ => Math.random() < 0.5), // t, t, t, f, f
                    map(_ => true),
                    //myTap(x => console.debug('Hallo', x)),
                    tap(_ => console.debug('intervall!')),
                    distinctUntilChanged(),// t, f
                    shareReplay({bufferSize: 1, refCount : true})
                    //tap(value => this.online = value)
        );

        this.flights$ = combineLatest([input$, this.online$]).pipe(
            betterLog('b4 filter'),
            filter( ([_, online]) => online ),
            map( ([input, online]) => input ),
            tap(v => this.loadingSubject.next(true)),
            switchMap(name => this.load(name)), 
            tap(v => this.loadingSubject.next(false)),
            takeUntil(this.closeSubj),
        )

        // this.flights$.subscribe();

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

        return this.http.get<Flight[]>(url, {params, headers}).pipe(
            // delay(7000)
                catchError(err => {
                    console.debug('Err', err);
                    return of([]);
                    // return throwError(err)
                }),             
        );

    };


}
