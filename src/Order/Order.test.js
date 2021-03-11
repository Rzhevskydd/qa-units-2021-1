import React from 'react'

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Order from './Order.js';
import {fakeOrders} from "../data/fakeOrders";

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

// getDate.mockReturnValue('31 февраля, чт, 2007 год');

configure({adapter: new Adapter()});

const it1 = {items: ['item1', 'item2']}
const it2 = {items: ['1', '2', '3']}
let orders = [it1, it2]


describe('Order.js', () => {

  beforeEach(() => {
    jest.resetModules();
    getDate.mockReturnValue('31 февраля, чт, 2007 год');
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('render no order is null', () => {
    const wrapper = shallow(<Order />);
    expect(wrapper.getElement()).toBeNull();
  })

  it('render with null props in data', () => {
    const data = {
      order: {
        shop: null,
        date: null,
      },
    };

    const result = shallow(<Order {...data}/>);

    expect(result).toMatchSnapshot();
  });

  it('render with items null in data', () => {
    const fakeOrder = Object.assign({}, fakeOrders[0]);
    fakeOrder.items = null


    const wrapper = shallow(<Order order={fakeOrder}/>);
    expect(getDate).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('render fakeOrder[0] snapshot', () => {
    const order = fakeOrders[0]
    const wrapper = shallow(<Order order={order}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});

