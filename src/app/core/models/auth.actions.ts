import { Action } from '@ngrx/store';


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  UPDATE_PROFILE = '[Auth] Set Profile',
  LOGIN_FAILURE = '[Auth] Login Failure',
  RESET_STATE = '[Auth] Reset State',
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateProfile implements Action {
  readonly type = AuthActionTypes.UPDATE_PROFILE;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class ResetState implements Action {
  readonly type = AuthActionTypes.RESET_STATE;
}

export type All =
  LogIn
  | LogInSuccess
  | UpdateProfile
  | LogInFailure
  | ResetState;
