import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../api/cities';

// Actions
const LOAD_STATES = 'LOAD_STATES';
const RESET_STATES = 'RESET_STATES';
const LOAD_CITIES = 'LOAD_CITIES';
const LOAD_DETAILS = 'LOAD_DETAILS';
const initialState = {
  states: [
    { name: 'loading states ...' },
  ],
  cities: ['init'],
  data: {
    labels: [],
    datasets: [
      {
        label: 'Air Gases',
        data: [],
        fill: true,
        backgroundColor: 'rgba(241, 197, 40, 0)',
        borderColor: 'rgba(241, 197, 40, 1)',
      },
    ],
  },
  loading: true,
  error: null,
};
  // Reducer
export default function citiesReducer(state = initialState, action = { payload: [] }) {
  const { payload } = action;
  switch (action.type) {
    case 'LOAD_STATES/fulfilled':
      return {
        ...state,
        loading: false,
        error: payload.error,
        states: payload,
      };
    case RESET_STATES:
      return {
        ...state,
        loading: false,
        error: payload.error,
        states: payload,
      };
    case LOAD_CITIES:
      return {
        ...state,
        loading: false,
        error: payload.error,
        cities: payload,
      };
    case LOAD_DETAILS:
      return {
        ...state,
        loading: false,
        error: payload.error,
        data: payload,
      };
    default:
      return state;
  }
}

// Action Creators

export const loadStates = createAsyncThunk(LOAD_STATES, async (country) => fetch(`${API_URL}/countries/states`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    country,
  }),
}).then((res) => res.json())
  .then((json) => json.data.states));

export const LoadCities = (value) => ({ type: LOAD_CITIES, payload: value });
export const ResetStates = (value) => ({ type: RESET_STATES, payload: value });
export const LoadDetails = (value) => ({ type: LOAD_DETAILS, payload: value });
