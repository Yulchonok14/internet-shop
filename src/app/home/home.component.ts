import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product-service/product-service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    host: {'class': 'app-home'}
})
export class HomeComponent implements OnInit {
    imageUrlArray: any[];
    constructor(private _productService: ProductService) {
        this._productService.getProducts().subscribe(responseProduct => {
            const length = responseProduct.data.length;
            const productsArray = length < 5 ? responseProduct.data :
                responseProduct.data.slice(length - 5);
            console.log('productsArray: ', productsArray);
            this.imageUrlArray = productsArray.map(product =>
                'uploads/' + product.image.slice(product.image.lastIndexOf('\\') + 1));
        });
    }

    ngOnInit() {}
}