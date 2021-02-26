import { Flight } from '@flight-workspace/flight-lib';
import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { flightsLoaded } from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppStateSlice {
  [flightBookingFeatureKey]: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[];
  stats: object;
  basket: object;
}

export const initialState: FlightBookingState = {
  flights: [],
  stats: {},
  basket: {}
};

export const reducer = createReducer(
  initialState,

  on(flightsLoaded, (state, action) => {
    const flights = action.flights

    // Mutable (fobidden!)
    // state.flights = flights;

    // Immutable
    return {...state, flights };
  }),

);

