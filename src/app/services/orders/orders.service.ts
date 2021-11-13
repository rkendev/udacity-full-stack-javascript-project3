import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartLineItem } from '../../models/cart/line-item';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { OrderInfo } from 'src/app/models/order/orderinfo';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderInfo: OrderInfo;
  cartItems: CartLineItem[] = [];
  totalCostOfItems = 0;

  constructor(private cartService: CartService) {
    this.orderInfo = {
      id: 0,
      name: '',
      deliveryAddres: '',
      billingAddres: '',
      state: '',
      paymentMethod: '',
    };
  }

  setOrderInformation(orderInfo: OrderInfo): void {
    this.orderInfo.id = Math.random();
    this.orderInfo.name = orderInfo.name;
    this.orderInfo.deliveryAddres = orderInfo.deliveryAddres;
    this.orderInfo.billingAddres = orderInfo.billingAddres;
    this.orderInfo.state = orderInfo.state;
    this.orderInfo.paymentMethod = orderInfo.paymentMethod;

    this.totalCostOfItems = this.cartService.geTotalCostOfItems();

    const objectTest = this.cartService.getAllItems();
    for (const item of objectTest){
      const cartLineItem = JSON.parse(item);
      this.cartItems.push(cartLineItem);
    }
    this.cartService.deleteAllItems();
  }

  getOrderInformation(): OrderInfo {
    return this.orderInfo;
  }

  getTotalCost(): number {
    return this.totalCostOfItems;
  }
}
