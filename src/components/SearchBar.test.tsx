import React             from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter           from 'enzyme-adapter-react-16';
import SearchBar         from './SearchBar';
import configureStore    from 'redux-mock-store';
import { Provider }      from "react-redux";

Enzyme.configure({ adapter: new Adapter() })

describe('Search Component testing', () => {

  const initialState = {
    posts: {
      status: 'success',
      search: [],
      favs: [],
      filter: '',
      display: 'default',
    }
  }

  const mockStore = configureStore()
  let store, container: any;

  beforeEach(() => {
    store = mockStore(initialState);
    container = mount(
      <Provider store={ store }>
        <SearchBar />
      </Provider>
    );
  })

  /**
   * Element render tests
   */

  test('Render component', () => {
    expect(container.find(SearchBar).length).toBe(1);
  })

  test('Render 2 text fields', () => {
    let component = container.find(SearchBar);
    let inputs = component.find('input');
    expect(inputs.length).toBe(2);
  })

  test('Render 2 buttons', () => {
    let buttons = container.find('button');
    expect(buttons.length).toBe(2);
  })

  /**
   * Element interaction tests
   */

  // test('Buttons disabled state', () => {
  //   expect(false).toBe(false)
  // })
})