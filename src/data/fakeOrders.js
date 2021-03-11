const fakeOrders = [
	{
		id: 123,
		date: 1544356800000,
		shop: 'Alihandro Express',
		items: [
			'Утиный пластмасса для показ новый год',
			'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
			'Новый стиль один розница яйцо для упаковки форма латекс',
		]
	},
	{
		id: 124,
		date: 1552481120000,
		shop: 'Lamodник.ru',
		items: [
			'Жакет - BOREAL5',
			'Miss Gabby Костюм',
			'Ostin перчатки мужские',
			'Zara худи роз.',
		]
	},
	{
		id: 126,
		date: 1552585550000,
		shop: 'Эльдоградо',
		items: [
			'Ноутбук Apple MacBook Air 13.3" (MQD32RU/A)',
			'Игровая приставка Sony PlayStation 4 Pro 1TB Black (CUH-7208B)',
		]
	},
];

const it1 = {items: ['item1', 'item2']}
const it2 = {items: ['1', '2', '3']}
let myFakeOrders = [it1, it2]

export {
	fakeOrders,
	it1,
	it2,
	myFakeOrders
}
