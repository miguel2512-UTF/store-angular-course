import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <a [routerLink]="['/']"><span>My Store</span></a>
      <span>|</span>
      <a [routerLink]="['/products']" class="f-14">Products</a>
      <span class="spacer"></span>
      <app-cart class="mouseHover"></app-cart>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
