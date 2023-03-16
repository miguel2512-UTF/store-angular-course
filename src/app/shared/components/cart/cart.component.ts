import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ShoppingCartService } from 'src/app/pages/products/services/shopping-cart.service'; 

@Component({
    selector: 'app-cart',
    template: `
        <ng-container *ngIf="{ total: total$ | async, quantity: quantity$ | async } as dataCart">
            <ng-container *ngIf="dataCart.total">
                <div class="cart">
                    <p (click)="goToCheckout()" class="cart-content">
                        <mat-icon>add_shopping_cart</mat-icon>
                        {{ dataCart.total | currency }} 
                        ({{ dataCart.quantity }}) 
                    </p>
                    <button mat-icon-button color="white" (click)="cancelCart()" title="Cancelar Compra">
                        <mat-icon>close</mat-icon>
                    </button> 
                </div> 
            </ng-container>
        </ng-container>
    `,
    styles: [`
        .cart{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .cart-content{
            margin: 0;
        }
    `]
})

export class CartComponent{
    quantity$ = this.shoppingService.quantityAction$
    total$ = this.shoppingService.totalAction$
    
    constructor(private shoppingService: ShoppingCartService, private router: Router){}

    cancelCart() {
        this.shoppingService.resetCart()
    }

    goToCheckout(): void{
        this.router.navigate(['/checkout'])
    }
}