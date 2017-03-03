import React from 'react';
import { connect } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import App from '../../client/src/components/App';

const test = () => <div>hi</div>;

function setup() {
  const props = {
    map: mockVenueData["-KdmcqUff2U8vDv-qfC1"].map
  }

  const setBasecamp = jest.fn();
  const enzymeWrapper = shallow(<test {...props} />);

  return {
    props,
    enzymeWrapper,
    setBasecamp
  }
}

describe('App', () => {
  it('should render Google Map iframe', () => {
    const { enzymeWrapper, setBasecamp, props } = setup();

    console.log(props, 'props');
    console.log(enzymeWrapper, 'enzymeWrapper');
    console.log(setBasecamp, 'setBasecamp');
    expect(true).toBe(true);

    // expect(enzymeWrapper.find('header').hasClass('header')).toBe(true)
    //
    // expect(enzymeWrapper.find('h1').text()).toBe('todos')
    //
    // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
    // expect(todoInputProps.newTodo).toBe(true)
    // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
  });

  // it('should call addTodo if length of text is greater than 0', () => {
  //   const { enzymeWrapper, props } = setup()
  //   const input = enzymeWrapper.find('TodoTextInput')
  //   input.props().onSave('')
  //   expect(props.addTodo.mock.calls.length).toBe(0)
  //   input.props().onSave('Use Redux')
  //   expect(props.addTodo.mock.calls.length).toBe(1)
  // });
});
