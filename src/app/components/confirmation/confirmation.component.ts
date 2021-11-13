import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartLineItem } from '../../models/cart/line-item';
import { OrderInfo } from 'src/app/models/order/orderinfo';
import { OrderService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  orderInfo: OrderInfo;
  cartItems: CartLineItem[] = [];
  totalCostOfItems = 0;

  constructor(private cartService: CartService,
              private orderService: OrderService) {
    this.orderInfo = {
      id: 0,
      name: '',
      deliveryAddres: '',
      billingAddres: '',
      state: '',
      paymentMethod: '',
    };
  }

  ngOnInit(): void {
    this.orderInfo = this.orderService.getOrderInformation();
    this.totalCostOfItems = this.orderService.getTotalCost();
  }
}
