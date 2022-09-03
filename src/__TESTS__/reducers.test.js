import '@testing-library/jest-dom';
import citiesReducer from '../redux/cities/cities';

describe('Data reducer test', () => {
  test('reducer has default state', () => {
    const initialState = {
      states: [
        { state_name: 'loading states ...' },
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
    const result = citiesReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  test('fetch cities data should return payload data', () => {
    const action = {
      type: 'LOAD_CITIES',
      payload: [],
    };
    const result = () => citiesReducer(undefined, action);
    expect(result().cities).toEqual([]);
  });

  test('fetch Deails data data should return payload data', () => {
    const action = {
      type: 'LOAD_DETAILS',
      payload: [],
    };
    const result = () => citiesReducer(undefined, action);
    expect(result().data).toEqual([]);
  });

  test('reset states data to initial state', () => {
    const action = {
      type: 'RESET_STATES',
      payload: [
        { state_name: 'loading states ...' },
      ],
    };
    const result = () => citiesReducer(undefined, action);
    expect(result().states).toEqual([
      { state_name: 'loading states ...' },
    ]);
  });
});
