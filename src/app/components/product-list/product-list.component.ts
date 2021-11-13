import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product/product';
import { ProductsService } from '../../services/products/products.service';
import { CartService } from '../../services/cart/cart.service';
import { CartLineItem } from '../../models/cart/line-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productsService: ProductsService,
              private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res) => {
      console.log(res);

      this.products = res;
    });
  }

  addedProduct(event: any): void {
    const cartLineItem: CartLineItem = event;
    const productFound = this.cartService.getItemById(cartLineItem.id.toString());
    if (productFound != null) {
      alert('The product is already in the cart. Go to your cart to add more of ' +
      'this product to your order');
      return;
    }
    this.cartService.addItem(event);
    alert(`The item ${cartLineItem.name} added to the cart`);
  }
}
