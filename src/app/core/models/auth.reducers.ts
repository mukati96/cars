import { All, AuthActionTypes } from './auth.actions';
import { User } from './user';
User

export interface State {
      // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: Partial<User> | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    errorMessage: null
};


export function reducer(state = initialState, action: All): State {
    switch (action.type) {
      case AuthActionTypes.LOGIN_SUCCESS: {
        return {
          ...state,
          isAuthenticated: true,
          user: {
            auth_token: action.payload.auth_token,
            email: action.payload.email
          },
          errorMessage: null
        };
      }
      case AuthActionTypes.LOGIN_FAILURE: {
        return {
          ...state,
          errorMessage: 'Incorrect email and/or password.'
        };
      }
      case AuthActionTypes.RESET_STATE: {
        return Object.assign({}, initialState);
      }
      default: {
        return state;
      }
    }
  }
