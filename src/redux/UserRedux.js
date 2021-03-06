// import { toast } from '../Omni';
import apiWorker from '../services/api';

const types = {
  LOGOUT: 'LOGOUT',

  LOGIN_PENDING: 'LOGIN_PENDING',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',

  REGISTER_PENDING: 'REGISTER_PENDING',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',

  GET_INFO_USER_PENDING: 'GET_INFO_USER_PENDING',
  GET_INFO_USER_FAILURE: 'GET_INFO_USER_FAILURE',
  GET_INFO_USER_SUCCESS: 'GET_INFO_USER_SUCCESS',
  
};

export const actions = {
  login: (payload) => dispatch => {
    apiWorker.signInUser(payload);
  },
  // registerBookstore: (payload, meta) => async (dispatch, getState) => {
  //   dispatch({ type: types.REGISTER_PENDING });
  //   const json = await antradeWorker.registerBookstore(payload);

  //   if (json.code === 200 && json.data && json.data.data) {
  //     dispatch({ type: types.REGISTER_SUCCESS });
  //     meta.onSuccess();
  //   } else {
  //     dispatch({ type: types.REGISTER_FAILURE });
  //     meta.onError();
  //   }
  // },
  loginSuccess: user => {
    return {type: types.LOGIN_SUCCESS, user};
  },
  loginFailure: error => {
    toast(Languages.LoginFailed);
    return {type: types.LOGIN_FAILURE, error};
  },
  logout: () => dispatch => {
    apiWorker.signOut();
  },
  getInfoUser: payload => dispatch => {
    dispatch({type: types.GET_INFO_USER_PENDING});

    if (payload?._user?.uid) {
      dispatch({type: types.GET_INFO_USER_SUCCESS, data: payload._user});
    } else {
      dispatch({type: types.GET_INFO_USER_FAILURE});
    }
  },
};

const initialState = {
  isFetching: false,
  user: null,
  token: null,
  firebaseToken: null,
  finishIntro: null,
  error: null,
};

export const reducer = (state = initialState, action) => {
  const {type, data} = action;

  switch (type) {
    case types.LOGIN_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    case types.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case types.GET_INFO_USER_PENDING:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_INFO_USER_SUCCESS:
      return {
        ...state,
        token: data.refreshToken,
        user: data,
        isFetching: false,
        // didInvalidateWallet: true,
      };

    case types.GET_INFO_USER_FAILURE:
      return {
        ...state,
        token: null,
        user: null,
        isFetching: false,
        // didInvalidateWallet: true,
      };
    // case types.GET_FIREBASE_REGISTRATION_TOKEN:
    // case types.REGISTER_FIREBASE_DEVICE_SUCCESS:
    //   return { ...state, firebaseToken: action.firebaseToken };
    // case types.REMOVE_FIREBASE_DEVICE_SUCCESS:
    //   return { ...state, firebaseToken: '' };
    // case types.REGISTER_FIREBASE_DEVICE_PENDING:
    // case types.REGISTER_FIREBASE_DEVICE_FAILURE:
    // case types.REMOVE_FIREBASE_DEVICE_PENDING:
    // case types.REMOVE_FIREBASE_DEVICE_FAILURE:
    //   return state;
    // case types.FINISH_INTRO:
    //   return { ...state, finishIntro: true };
    // case types.SET_API_TOKEN:
    //   if (!antradeWorker.authzToken && state.token) {
    //     antradeWorker.setToken(state.token);
    //   }
    //   return state;
    default:
      return state;
  }
};
