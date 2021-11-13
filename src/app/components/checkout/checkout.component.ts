import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartLineItem } from '../../models/cart/line-item';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { OrderInfo } from 'src/app/models/order/orderinfo';
import { OrderService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartLineItem[] = [];
  totalCostOfItems = 0;
  paymentMethods = ['By Receipt', 'Cash On Delivery'];
  orderNumber: number = Math.random();
  model = new OrderInfo(this.orderNumber, '', '', '', '', '');

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService) {
    this.totalCostOfItems = 0;
    this.totalCostOfItems = this.cartService.geTotalCostOfItems();

    const objectTest = this.cartService.getAllItems();
    for (const item of objectTest) {
      const cartLineItem = JSON.parse(item);
      this.cartItems.push(cartLineItem);
    }
  }

  ngOnInit(): void {
  }

  confirmOrder(): void {
    if (this.model.name === '') {
      alert('The name field cannot be empty!');
      return;
    }
    if (this.model.deliveryAddres === '') {
      alert('The Delivery Address field cannot be empty!');
      return;
    }
    if (this.model.billingAddres === '') {
      alert('The Billing Adress field cannot be empty!');
      return;
    }
    if (this.model.state === '') {
      alert('The State field cannot be empty!');
      return;
    }
    if (this.model.paymentMethod === '') {
      alert('Select a payment method!');
      return;
    }

    if (this.totalCostOfItems <= 0) {
      alert('You cannot checkout using an empty cart!' +
        '\n Please add items to your cart before checking out');
      return;
    }

    this.orderService.setOrderInformation(this.model);
    this.router.navigate(['components/confirmation']);
  }
}
