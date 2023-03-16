import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../products/services/shopping-cart.service';

@Component({
  selector: 'app-thank-you-page',
  template: `
    <div class="container" *ngIf="isOrderConfirmed">
      <h1 class="title">Thank you!</h1>
      <p class="content">
          Your order is on the way!
      </p>
      <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad totam fugit molestias vitae 
          necessitatibus neque dicta recusandae quaerat, odit, fuga porro et soluta iure, quae omnis? 
          Quia veritatis culpa quibusdam.
      </span>
    </div>
  `,
  styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent {
  isOrderConfirmed: boolean = this.shoppingService.isOrderConfirmed

  constructor(private shoppingService: ShoppingCartService, private router: Router) {
    this.checkIfOrderIsConfirmed()
  }

  checkIfOrderIsConfirmed(){
    if (!this.isOrderConfirmed) {
      this.router.navigate(['/'])
    }
  }
}
