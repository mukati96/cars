import * as auth from './auth.reducers';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
    authState: auth.State;
}
export const selectAuthState = createFeatureSelector<AppState>('auth');
export const reducers = {
    auth: auth.reducer
};

