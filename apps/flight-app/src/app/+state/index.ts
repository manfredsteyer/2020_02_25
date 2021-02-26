import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';


export interface State {

}

export const reducers: ActionReducerMap<State> = {
};

// apps\flight-app\src\app\+state\index.ts

// [...]

// Insert this:
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
 
    return reducer(state, action);
  };
}

// Existing line -- I've just added some line breaks
export const metaReducers: MetaReducer<State>[] = 
  !environment.production 
    ? [] 
    : [debug]; // <-- Add debug here
