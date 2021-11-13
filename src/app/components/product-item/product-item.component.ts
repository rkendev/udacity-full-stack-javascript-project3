import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product/product';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { CartService } from '../../services/cart/cart.service';
import { CartLineItem } from '../../models/cart/line-item';

export type CartItem = {
  name?: string,
  price?: number,
  quantity?: number,
  url?: string
};

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Output() addedProduct = new EventEmitter();

  public options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  selectedQuantity = '1';

  public onClickChange = () => {
    // this.router.navigateByUrl(`/${this.product.name}`);
  }
  constructor(private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService,
    ) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: 'test',
      description: '',
    };
  }

  // event handler for the select element's change event
  selectChangeHandler(event: any): void {
    // update the ui
    this.selectedQuantity = event.target.value;
  }

  selectedQuantityChanged(arg: string): void {
    this.selectedQuantity = arg;
  }

  ngOnInit(): void {}

  addItemToCart(): void {
    const cartLineItem: CartLineItem = {
      id: this.product.id, name: this.product.name, price: this.product.price,
      url: this.product.url, description: this.product.description,
      quantity: parseInt(this.selectedQuantity, 10),
      total: (this.product.price * parseInt(this.selectedQuantity, 10))
    };
    this.addedProduct.emit(cartLineItem);
  }
}
