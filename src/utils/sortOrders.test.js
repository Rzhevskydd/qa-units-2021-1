import React from 'react'
import {sortByDate, sortByItemCount, sortOrders} from './sortOrders';
import {it1, it2, myFakeOrders} from "../data/fakeOrders";

describe('sortByItemCount function', () => {
	it('orders are null', () => {
		const result = sortByItemCount(null, null);
		expect(result).toEqual(0);
	});

	it('orders are not objects', () => {
		const result = sortByItemCount(new Map(), new Map());
		expect(result).toEqual(0);
	});

	it('not items property in orders', () => {
		const failIt1 = {notItems: ['item1', 'item2']}
		const failIt2 = {notItems: ['1', '2', '3']}

		const result = sortByItemCount(failIt1, failIt2);
		expect(result).toEqual(0);
	});

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});


	test.each([
		[{items: ['item1', 'item2']}, {items: ['1', '2']}, 0],
		[{items: ['item1', 'item2']}, {items: ['1', '2', '3']}, -1],
		[{items: ['item1', 'item2', 'item3']}, {items: ['1', '2']}, 1],
	])('.compare(%i, %i)', (a, b, expected) => {
		expect(sortByItemCount(a, b)).toBe(expected);
	});
});

describe('sortOrders function', () => {
	it('orders param is undefined', () => {
		const stubFn = jest.fn()
		sortOrders(null, stubFn);

		expect(stubFn).not.toHaveBeenCalled();
	});

	it('sortFunction param is undefined', () => {
		const stubFn = jest.fn()
		sortOrders(myFakeOrders, null);

		expect(stubFn).not.toHaveBeenCalled();
	});

	it('function work correctly :)))))', () => {
		const copyOrders1 = myFakeOrders.map(a => Object.assign({}, a));

		sortOrders(myFakeOrders, sortByItemCount);

		const copyOrders2 = myFakeOrders.map(a => Object.assign({}, a));

		let equalFlag = true
		for (let i = 0; i < myFakeOrders.length; i++) {

			if (!(JSON.stringify(copyOrders1[i]) === JSON.stringify(copyOrders2[i]))) {
				equalFlag = false
			}
		}
		expect(equalFlag).toBe(true);
	});
});

describe('sortByDate function', () => {
    it('orders are null', () => {
        const result = sortByDate(null, null);
        expect(result).toEqual(0);
    });

    it('orders are not objects', () => {
        const result = sortByDate(2, 3);
        expect(result).toEqual(0);
    });

    it('date in orders are null', () => {
        const order1 = {
            date: null,
        };

        const order2 = {
            date: null,
        };

        const result = sortByDate(order1, order2);

        expect(result).toBe(0);
    });

	test.each([
		[{date: 2}, {date: 1}, -1],
		[{date: 1}, {date: 2}, 1],
		[{date: 1}, {date: 1}, 0],
	])('.compare dates(%i, %i)', (a, b, expected) => {
		expect(sortByDate(a, b)).toBe(expected);
	});
});

