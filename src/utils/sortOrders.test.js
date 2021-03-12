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
		const stubFunc = null;
		const copyFakeOrders = myFakeOrders.map(a => Object.assign({}, a));
		sortOrders(myFakeOrders, stubFunc);

		expect(myFakeOrders).toEqual(copyFakeOrders);
	});

	it('function work correctly :)))))', () => {
		const copyOrders1 = myFakeOrders.map(a => Object.assign({}, a));

		sortOrders(myFakeOrders, sortByItemCount);

		const copyOrders2 = myFakeOrders.map(a => Object.assign({}, a));

		expect(copyOrders1).toEqual(copyOrders2);
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
		[{date: new Date("1996-12-17T03:24:00")}, {date: new Date("1995-12-17T03:24:00")}, -1],
		[{date: new Date("1995-12-17T03:24:00")}, {date: new Date("1996-12-17T03:24:00")}, 1],
		[{date: 1}, {date: 1}, 0],
	])('.compare dates(%i, %i)', (a, b, expected) => {
		expect(sortByDate(a, b)).toBe(expected);
	});
});

