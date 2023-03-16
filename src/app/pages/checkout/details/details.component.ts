import { Component } from '@angular/core';
import { Product } from '../../products/interfaces/product.interface';
import { ShoppingCartService } from '../../products/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  total$ = this.shoppingService.totalAction$
  cart$ = this.shoppingService.cartAction$

  // Inyectando el shoppingService
  constructor(private shoppingService: ShoppingCartService){}

  removeProduct(product: Product){
    this.shoppingService.removeProduct(product)
  }
}
