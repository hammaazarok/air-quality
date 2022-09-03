import React from 'react';
import Renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import Home from '../components/Home';
import NavBar from '../components/NavBar';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    country: 'company-id1',
  }),
  useRouteMatch: () => ({ url: '/cities/Libya' }),
}));

describe('test components', () => {
  it('Home renders correctly', () => {
    const tree = Renderer
      .create(
        <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
              <Home />
            </BrowserRouter>
          </Provider>
        </React.StrictMode>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Cities renders correctly', async () => {
    const tree = Renderer.create(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('NavBar renders correctly', async () => {
    const tree = Renderer.create(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <NavBar />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
