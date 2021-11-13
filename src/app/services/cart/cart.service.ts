import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { CartLineItem } from '../../models/cart/line-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartLineItem[] = [];
  private observableList: BehaviorSubject<CartLineItem[]> = new BehaviorSubject(this.cartItems);
   constructor(private localStorageService: LocalStorageService) {
  }

  addItem(item: CartLineItem): void {
    this.localStorageService.addItem(item.id.toString(), JSON.stringify(item));
  }

  updateItem(item: CartLineItem): void {
    this.localStorageService.addItem(item.id.toString(), JSON.stringify(item));
  }

  deleteItem(item: CartLineItem): void  {
    this.localStorageService.deleteItem(item.id.toString());
  }

  getItem(item: CartLineItem): any {
    const itemFound = this.localStorageService.getItem(item.id.toString());
    if (itemFound != null) {
      return JSON.parse(itemFound);
    }
    else {
      return null;
    }
  }

  getItemById(id: string): any {
    const itemFound = this.localStorageService.getItem(id);
    if (itemFound != null) {
      return JSON.parse(itemFound);
    }
    else {
      return null;
    }
  }

  deleteAllItems(): void {
    this.localStorageService.clear();
  }

  getAllItems(): any {
    return this.localStorageService.getAllItems();
  }

  isEmpty(): boolean  {
    const objectList = this.getAllItems();
    if (objectList.length <= 0) {
      return true;
    }
    return false;
  }

  geTotalCostOfItems(): number {
    let totalCostOfItems = 0;
    const objectTest = this.getAllItems();
    for (const item of objectTest) {
      console.log(item);
      const cartLineItem = JSON.parse(item);
      totalCostOfItems += cartLineItem.price * cartLineItem.quantity;
    }
    return Math.round(totalCostOfItems * 100) / 100;
  }
}

