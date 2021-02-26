import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.FlightBookingState>(
  fromFlightBooking.flightBookingFeatureKey
);



export const selectFlights = 
  (appState: fromFlightBooking.FlightBookingAppStateSlice) => 
    appState[fromFlightBooking.flightBookingFeatureKey].flights;


export const selectFlihgts2 = createSelector(
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].flights,
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].denyList,
  (flights, denyList) => flights.filter(f =>  !denyList.includes(f.id))
);
