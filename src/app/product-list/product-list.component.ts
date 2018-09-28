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
        this._productService.getProducts().subscribe(responseProduct => {
            console.log('responseProduct: ', responseProduct);
            this.products = responseProduct.data;
        });
    }

    delete(product) {
        console.log('product: ', product);
        this._productService.deleteProduct(product.id);
    }

    update(product) {
        console.log('product: ', product);
        this._productService.updateProduct();
    }

    add() {
        this._productService.addProduct();
    }

    ngOnInit() {}
}