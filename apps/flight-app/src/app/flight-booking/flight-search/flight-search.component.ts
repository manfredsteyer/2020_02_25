import {Component, OnInit} from '@angular/core';
import {FakeFlightService, FlightService} from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { flightsLoaded } from '../+state/flight-booking.actions';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from '../+state/flight-booking.reducer';

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

  flights$ = this.store.select(appState => appState[flightBookingFeatureKey].flights);
  // flights$ = this.store.select(appState => appState.flightBooking.flights);
  // flights$ = this.store.select(appState => appState['flightBooking'].flights);

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private store: Store<FlightBookingAppStateSlice>,
    private flightService: FlightService) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.flightService
      .find(this.from, this.to, this.urgent)
      .subscribe(
        flights => {
          this.store.dispatch(flightsLoaded({flights}));
        }
      )
  }

  delay(): void {
    this.flightService.delay();
  }

}
