import { Injectable } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { flightsLoaded, loadFlights } from './flight-booking.actions';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from './flight-booking.reducer';
import { selectFlihgts2 as selectFlights2 } from './flight-booking.selectors';


// --- 4 ---
@Injectable({providedIn: 'root'})
export class FlightBookingFacade {
    
    readonly flights$ = this.store.select(selectFlights2);

    constructor(
        private store: Store<FlightBookingAppStateSlice>) { }
    
    search(from: string, to: string, urgent: boolean): void {

        this.store.dispatch(loadFlights({from, to, urgent}));
    
    }

}


// --- 3 ---
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {
    
//     readonly flights$ = this.store.select(selectFlights2);

//     constructor(
//         private store: Store<FlightBookingAppStateSlice>,
//         private flightService: FlightService) { }
    
//     search(from: string, to: string, urgent: boolean): void {
//         this.flightService.find(from, to, urgent).subscribe(
//             flights => {
//                 this.store.dispatch(flightsLoaded({flights})); 
//             },
//             err => {
//                 console.error('err', err);
//             }
//         );
//     }

// }

// // --- 2 ---
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {
    
//     readonly flights$ = this.store.select(a => a[flightBookingFeatureKey].flights);

//     constructor(
//         private store: Store<FlightBookingAppStateSlice>,
//         private flightService: FlightService) { }
    
//     search(from: string, to: string, urgent: boolean): void {
//         this.flightService.find(from, to, urgent).subscribe(
//             flights => {
//                 this.store.dispatch(flightsLoaded({flights})); 
//             },
//             err => {
//                 console.error('err', err);
//             }
//         );
//     }

// }

// --- 1 ---
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {
    
//     private flightsSubject = new BehaviorSubject<Flight[]>([]);
//     readonly flights$: Observable<Flight[]> = this.flightsSubject.asObservable();

//     constructor(private flightService: FlightService) { }
    
//     search(from: string, to: string, urgent: boolean): void {
//         this.flightService.find(from, to, urgent).subscribe(
//             flights => {
//                this.flightsSubject.next(flights); 
//             },
//             err => {
//                 console.error('err', err);
//             }
//         );
//     }

// }