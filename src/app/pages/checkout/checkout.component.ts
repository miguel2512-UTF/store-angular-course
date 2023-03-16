import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { DataService } from 'src/app/shared/services/dataService';
import { Product } from '../products/interfaces/product.interface';
import { ProductService } from '../products/services/product.service';
import { ShoppingCartService } from '../products/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  }
  isDelivery: boolean = false
  cart: Product[] = []
  stores: Store[] = []

  constructor(
    private dataService: DataService, 
    private shoppingService: ShoppingCartService,
    private router: Router,
    private productService: ProductService
  ){
    this.checkIfCartIsEmpty()
  }

  ngOnInit(): void {
      this.getStores()
      this.getDataCart()
  }

  onPickupOrDelivery(value: boolean){
    this.isDelivery = value
  }

  onSubmit({ value: formData }: NgForm){
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }

    this.dataService.saveOrder(data)
    .pipe(
      tap( res => console.log('Order -->', res)),
      switchMap(({id: orderId})=> {
        const details = this.prepareDetails()
        return this.dataService.saveDetailsOrder({details, orderId})
      }),
      tap( () => {
        this.shoppingService.resetCart()
        this.shoppingService.isOrderConfirmed = true
        this.router.navigate([`/checkout/thank-you-page`])
      })
      // delay(2000) -> Operador que se la de un tiempo en milisegundos para que
      // ejecute la siguiente función
    )
    .subscribe()
  }

  private getStores():void {
    this.dataService.getStores()
    // los pipes te permiten combinar multiples funciones en una sola
    // Recibe como argumentos las funciones que quieres que combine
    // Este retorna una nueva función, que ejecutas las funciones en secuencia
    .pipe(
      // Es el conjunto de instrucciones que usaremos para producir los valores
      // que nos interesan
      // Tap: El observable devuelto por tap es un espejo exacto de la fuente
      tap( (stores: Store[]) => this.stores = stores)
    )
    // Nos suscribimos al observable para conseguir los valores
    .subscribe()
  }

  private getCurrentDay(): string{
    return new Date().toLocaleDateString()
  }

  private prepareDetails(): Details[] {
    const details: Details[] = []
    this.cart.forEach((product)=>{
      const { id: productId, name: productName, quantity: quantity, stock} = product
      const updateStock = (stock - quantity)

      this.productService.updateStock(productId, updateStock)
      .subscribe()

      details.push({ productId, productName, quantity })
    })
    return details
  }

  private getDataCart(): void{
    this.shoppingService.cartAction$
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
    .subscribe()
  }

  private checkIfCartIsEmpty(): void {
    this.shoppingService.cartAction$
    .pipe(
      tap((products: Product[]) => {
        if (Array.isArray(products) && !products.length) {
          this.router.navigate(['/products'])
        }
      })
    )
    .subscribe()
  }
}
