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

  test('Search button disabled state change on input', () => {
    let description = container.find('input').at(0);
    let location = container.find('input').at(1);
    /*
      i wanted to do a button variable
      but for some reason it's state would not update on change
      while the full path call works every time
      ?question mark?
     */
    /**
     * Initial state test
     */
    expect(container.find('button').at(0).prop('disabled')).toBe(true);

    /**
     * Stage change on Description input
     */
    description.simulate('change', { target: { value: 'js' } });
    expect(container.find('button').at(0).prop('disabled')).toBe(false);
    description.simulate('change', { target: { value: '' } });

    /**
     * State change on Location input
     */
    location.simulate('change', { target: { value: 'moscow' } });
    expect(container.find('button').at(0).prop('disabled')).toBe(false);
    location.simulate('change', { target: { value: '' } });

    /**
     * State change on both Description and Location input
     */
    description.simulate('change', { target: { value: 'js' } });
    location.simulate('change', { target: { value: 'moscow' } });
    expect(container.find('button').at(0).prop('disabled')).toBe(false);
    description.simulate('change', { target: { value: '' } });
    location.simulate('change', { target: { value: '' } });

    /**
     * State reversion to initial on input clear
     */
    expect(container.find('button').at(0).prop('disabled')).toBe(true);
  })
})
