import {Component, OnInit} from '@angular/core';
import {FakeFlightService, FlightService} from '@flight-workspace/flight-lib';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { flightsLoaded, loadFlights } from '../+state/flight-booking.actions';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { selectFlights, selectFlihgts2 } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  // *ngFor="let f of flights"
  get flights() {
    return this.flightService.flights;
  }

  // flights$ = this.flightService.flights$;

  flights$ = this.store.select(selectFlihgts2);
  // flights$ = this.store.select(appState => appState.flightBooking.flights);
  // flights$ = this.store.select(appState => appState['flightBooking'].flights);

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private actions$: Actions,
    private store: Store<FlightBookingAppStateSlice>,
    private flightService: FlightService) {
  }

  ngOnInit() {

    this.actions$.pipe(ofType(/*LoadFlightsError*/)).subscribe(_ => {

    });

  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({from: this.from, to: this.to, urgent: this.urgent}));

  }

  delay(): void {
    this.flightService.delay();
  }

}
