import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { CartLineItem } from '../../models/cart/line-item';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CartService', () => {
  let service: CartService;
  let cartLineItem: CartLineItem;
  let cartLineItem2: CartLineItem;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(CartService);
    cartLineItem = {
      id: 1,
      name: 'Test Product',
      price: 100,
      url: 'http://testurl.com',
      description: 'Test Description',
      quantity: 1,
      total: 0
    };

    cartLineItem2 = {
      id: 2,
      name: 'Test Product2',
      price: 200,
      url: 'http://testurl.com',
      description: 'Test Description2',
      quantity: 1,
      total: 0
    };
  });

  it('add item and get item from cart', () => {
    service.addItem(cartLineItem);
    const cartLineItemFound: CartLineItem = service.getItem(cartLineItem);

    expect(cartLineItemFound.id).toEqual(1);
    service.deleteItem(cartLineItem);
  });

  it('add item  and get item by id from cart', () => {
    service.addItem(cartLineItem);
    const cartLineItemFound: CartLineItem = service.getItemById(cartLineItem.id.toString());

    expect(cartLineItemFound.id).toEqual(1);
    service.deleteItem(cartLineItem);
  });

  it('add item and get item by wrong id from cart', () => {
    service.addItem(cartLineItem);
    const cartLineItemFound: CartLineItem = service.getItemById('2');

    expect(cartLineItemFound).toBeNull();
    service.deleteItem(cartLineItem);

  });

  it('delete item from cart', () => {
    service.addItem(cartLineItem);
    service.deleteItem(cartLineItem);
    const cartLineItemFound: CartLineItem = service.getItemById('1');
    expect(cartLineItemFound).toBeNull();

  });

  it('delete all items from cart', () => {
    service.addItem(cartLineItem);
    service.addItem(cartLineItem2);

    service.deleteAllItems();
    const cartLineItemFound: CartLineItem = service.getItemById('1');
    expect(cartLineItemFound).toBeNull();
  });

  it('delete wrong item from cart', () => {
    service.addItem(cartLineItem);

    service.deleteItem(cartLineItem2);
    const cartLineItemFound: CartLineItem = service.getItemById('1');
    expect(cartLineItemFound.id).toEqual(1);
    service.deleteAllItems();
  });

  it('update item', () => {
    service.addItem(cartLineItem);
    cartLineItem.quantity = 5;
    service.addItem(cartLineItem);

    const cartLineItemFound: CartLineItem = service.getItemById('1');
    expect(cartLineItemFound.quantity).toEqual(5);
    service.deleteAllItems();
  });

  it('cart is empty', () => {
    service.addItem(cartLineItem);
    service.addItem(cartLineItem2);
    service.deleteAllItems();
    expect(service.isEmpty()).toEqual(true);
  });

  it('cart not empty', () => {
    service.addItem(cartLineItem);
    expect(service.isEmpty()).toEqual(false);
    service.deleteAllItems();
  });

  it('get total cost of items', () => {
    service.addItem(cartLineItem);
    service.addItem(cartLineItem2);
    expect(service.geTotalCostOfItems()).toEqual(300);
    service.deleteAllItems();
  });

  it('get total cost of items empty cart', () => {
    expect(service.geTotalCostOfItems()).toEqual(0);
    service.deleteAllItems();
  });

  it('get all items in cart', () => {

    service.addItem(cartLineItem);
    service.addItem(cartLineItem2);

    let allItemsFound = true;
    const objectTest = service.getAllItems();

    const cartLineItemRet1 = JSON.parse(objectTest[0]);
    const item1Id: number = cartLineItemRet1.id;

    const cartLineItemRet2 = JSON.parse(objectTest[1]);
    const item2Id: number = cartLineItemRet2.id;

    if (item1Id === 2 && item2Id === 1) {
      allItemsFound = true;
    }

    expect(allItemsFound).toEqual(true);
    service.deleteAllItems();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
