import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Product } from "../interfaces/product.interface";

@Injectable(
    { providedIn: 'root' }
)
export class ShoppingCartService {
    products: Product[] = [];
    isOrderConfirmed: boolean = false

    // BehaviorSubject - Lee anteriores emisiones
    // Necesita un valor por defecto como parametro
    private cartSubject = new BehaviorSubject<Product[]>([]);
    // Subject - No lee anteriores emisiones, lee futuras emisiones
    // private cartSubject = new Subject<Product[]>()
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

    // Métodos accesores
    get cartAction$(): Observable<Product[]>{
        return this.cartSubject.asObservable()
    }

    get totalAction$(): Observable<number>{
        return this.totalSubject.asObservable()
    }

    get quantityAction$(): Observable<number>{
        return this.quantitySubject.asObservable()
    }

    updateCart(product: Product):void{
        this.addToCart(product)
        this.quantityProduct()
        this.calcTotal()
    }

    resetCart():void {
        this.cartSubject.next([])
        this.totalSubject.next(0)
        this.quantitySubject.next(0)
        this.products = []
    }

    removeProduct(product: Product):void {
        let removeProduct = this.products.findIndex(({id}) => id == product.id)

        this.products.splice(removeProduct, 1)
        this.cartSubject.next(this.products)
        this.quantityProduct()
        this.calcTotal()
    }

    private addToCart(product: Product):void{
        const isProductInCart = this.products.find(({id}) => id == product.id)
        if (isProductInCart) {
            // Si el producto ya está en el cart se va a sumar 1 a su cantidad
            isProductInCart.quantity += 1
        }else{
            // Si el producto no es el mismo
            this.products.push({...product, quantity: 1})
        }
       
        this.cartSubject.next(this.products)
    }

    private quantityProduct():void{
        const quantity = this.products.reduce((acc, prod)=>acc += prod.quantity, 0)  
        this.quantitySubject.next(quantity)
    }

    private calcTotal(): void{
        const total = this.products.reduce((acc, prod)=>acc += (prod.price * prod.quantity), 0)
        this.totalSubject.next(total)
    }
}