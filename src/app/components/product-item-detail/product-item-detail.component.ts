import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/product/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CartLineItem } from '../../models/cart/line-item';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {

  products: Product[] = [];
  productsFiltered: Product[] = [];
  product: Product;
  public options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedQuantity = '1';

  selectedQuantityChanged(arg: string): void  {
    this.selectedQuantity = arg;
  }

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      const name = this.route.snapshot.params.productName;
      const cap1stLetter = name.charAt(0).toUpperCase() + name.slice(1);
      this.productsFiltered = products.filter((item) => item.name === cap1stLetter);
      this.product = this.productsFiltered[0];
    });
  }

  addItemToCart(): void  {
    const productFound = this.cartService.getItemById(this.product.id.toString());
    if (productFound != null) {
      alert('The product is already in the cart. Go to your cart to add more of' +
      'this product to your order');
      return;
    }

    const cartLineItem: CartLineItem = {
    id: this.product.id, name: this.product.name, price: this.product.price,
    url: this.product.url, description: this.product.description,
    quantity: parseInt(this.selectedQuantity, 10),
    total: (this.product.price * parseInt(this.selectedQuantity, 10))
    };
    this.cartService.addItem(cartLineItem);
    alert(`The item ${this.product.name} added to the cart`);
  }
}
