import { Component, EventEmitter, Input, ChangeDetectionStrategy, Output } from "@angular/core";
import { Product } from "../interfaces/product.interface";

@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    // Mecanismo de detección de cambios que utiliza Angular para saber cuando debe actualizar un
    // componente o toda la vista.
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductComponent{
    // Entrada: Flujo de componente padre a hijo
    // En un componente hijo significa que la propiedad puede recibir el valor de su componente padre
    @Input() product!: Product;

    // Salida: Flujo de componente hijo a padre 
    // En un componente hijo permite que los datos fluyan hacía el padre
    // Evento custom ------------- ↓
    @Output() addToCart = new EventEmitter<Product>();

    onClick(): void{
        console.log(this.product);
        this.addToCart.emit(this.product)
    }
}