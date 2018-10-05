import {Component, OnInit} from '@angular/core';

import {ProductService} from '../shared/product-service/product-service'
import {Product} from '../product';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products: Product[];/* = [{
        id: 1000,
        name: 'skirt',
        image: '',
        description: '',
        price: 30
    }];*/

    constructor(private _productService: ProductService) {
        console.log('in constructor...');
        this._productService.getProducts().subscribe(responseProduct => {
            this.products = responseProduct.data;
        });
    }

    ngOnInit() {}

    delete(product) {
        this._productService.deleteProduct(product.id).subscribe(() => {
            this._productService.getProducts().subscribe(responseProduct => {
                this.products = responseProduct.data;
            });
        })
    }

    update(product) {
        this._productService.updateProduct(product.id).subscribe(() => {
            this._productService.getProducts().subscribe(responseProduct => {
                this.products = responseProduct.data;
            });
        })
    }

    add() {
        this._productService.addProduct().subscribe(() => {
            this._productService.getProducts().subscribe(responseProduct => {
                this.products = responseProduct.data;
            });
        })
    }
}