import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartLineItem } from '../../models/cart/line-item';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartLineItem[] = [];
  totalCostOfItems = 0;

  constructor(
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.totalCostOfItems = 0;
    this.totalCostOfItems = this.cartService.geTotalCostOfItems();

    const objectTest = this.cartService.getAllItems();
    for (const item of objectTest) {
      const cartLineItem = JSON.parse(item);
      this.cartItems.push(cartLineItem);
    }
  }

  increamentQTY(productId: number, incrementValue: number): void {
    const cartLineItem = this.cartService.getItemById(productId.toString());
    cartLineItem.quantity = cartLineItem.quantity + incrementValue;
    this.cartService.updateItem(cartLineItem);
    this.updateModel();
  }

  emptyCart(): void {
    const choice = confirm('Are you sure you want empty your cart');
    if (choice === false) {
      alert('Item will remain in cart');
      return;
    }
    this.cartService.deleteAllItems();
    this.updateModel();
  }

  decreamentQTY(productId: number, decrementValue: number): void {
    const cartLineItem = this.cartService.getItemById(productId.toString());
    cartLineItem.quantity = cartLineItem.quantity - decrementValue;
    if (cartLineItem.quantity < 1) {
      alert('Use the Remove button to remove items from the cart');
      return;
    }
    this.cartService.updateItem(cartLineItem);
    this.updateModel();
  }

  removeItem(productId: number): boolean {
    const choice = confirm('Are you sure you want to remove the item?');
    if (choice === false) {
      alert('Item will remain in cart');
      return false;
    }
    const cartLineItem = this.cartService.getItemById(productId.toString());
    this.cartService.deleteItem(cartLineItem);
    this.updateModel();
    return true;
  }

  checkOut(): void {
    this.router.navigate(['/components/checkout']);
  }

  formButtonEnabled(): boolean {
    return this.cartService.isEmpty();
  }

  updateModel(): void {
    this.cartItems = [];
    const objectTest = this.cartService.getAllItems();
    for (const item of objectTest) {
      const cartLineItem = JSON.parse(item);
      this.cartItems.push(cartLineItem);
    }
    this.totalCostOfItems = this.cartService.geTotalCostOfItems();
  }
}
