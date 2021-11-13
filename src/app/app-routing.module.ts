import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':productName', component: ProductItemDetailComponent },
  { path: 'components/cart', component: CartComponent },
  { path: 'components/checkout', component: CheckoutComponent },
  { path: 'components/confirmation', component: ConfirmationComponent },
  { path: 'components/confirmation', component: ConfirmationComponent },
  { path: 'components/productlist', component: ConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
