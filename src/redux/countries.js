import * as ActionTypes from './ActionTypes';

const AllCountries = (state = {
  isLoading: true,
  errMess: null,
  allCountries: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ALL_COUNTRIES:
      return {
        ...state, isLoading: false, errMess: null, allCountries: action.payload,
      };
    case ActionTypes.ALL_COUNTRIES_LOADING:
      return {
        ...state, isLoading: true, errMess: null, allCountries: [],
      };
    case ActionTypes.ALL_COUNTRIES_FAILED:
      return {
        ...state, isLoading: false, errMess: action.payload, allCountries: [],
      };
    default:
      return state;
  }
};

export default AllCountries;
