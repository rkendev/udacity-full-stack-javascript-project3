import { TestBed } from '@angular/core/testing';

import { OrderService } from './orders.service';
import { OrderInfo } from 'src/app/models/order/orderinfo';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrdersService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(OrderService);
  });

  it('get order info', () => {
    let orderInfo: OrderInfo;
    let orderInfoRetreived: OrderInfo;
    let allInfoFound = false;

    orderInfo = {
      id: 0,
      name: 'Test',
      deliveryAddres: 'Test Address',
      billingAddres: 'Test Billing Address',
      state: 'Test State',
      paymentMethod: 'Test Payment Method',
    };

    service.setOrderInformation(orderInfo);
    orderInfoRetreived = service.getOrderInformation();

    if (orderInfoRetreived.name === 'Test' &&
      orderInfoRetreived.deliveryAddres === 'Test Address' &&
      orderInfoRetreived.billingAddres === 'Test Billing Address'
      && orderInfoRetreived.state === 'Test State' && orderInfoRetreived.paymentMethod === 'Test Payment Method') {
        allInfoFound = true;
    }

    expect(allInfoFound).toEqual(true);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
