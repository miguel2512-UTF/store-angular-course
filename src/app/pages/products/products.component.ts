import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Product } from './interfaces/product.interface';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';

@Component({
  selector: 'app-products',
  template: `
    <section class="products">
      <product 
          (addToCart)="addToCart($event)"
          [product]="product" 
          *ngFor="let product of products"
      ></product>
    </section>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  constructor(private productService: ProductService, private shoppingSerice: ShoppingCartService){}

  ngOnInit(): void {
      this.productService.getProducts()
      .pipe(
        tap( (responseProducts: Product[]) => this.products = responseProducts)
      )
      .subscribe()
  }

  addToCart(product: Product):void{
    this.shoppingSerice.updateCart(product)
  }
}
