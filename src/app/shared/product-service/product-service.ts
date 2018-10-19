import {Product} from '../../product';

import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


interface Response {
    status: number;
    message: string;
    data: Product[];
}

@Injectable()
export class ProductService {

    private productsUrl = 'products';

    constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
        this.productsUrl = origin ? `${origin}${this.productsUrl}` : this.productsUrl;
        console.log('ProductUrl: ', this.productsUrl);
    }

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getProducts(): Observable<Response> {
        return this.http.get<Response>(this.productsUrl);
    }

    addProduct(newProduct) {
        const newProd = {
            'name': newProduct.productName,
            'id': newProduct.productCode,
            'image': newProduct.productImage,
            'description': newProduct.productDescr,
            'price': newProduct.productPrice
        };
        console.log('newProd: ', newProd);
        return this.http.post('/product', newProd);
    }

    updateProduct(productId) {
        const updatedProd = {
            'id': '1001',
            'name': 'NewProductUpdated'
        };
        return this.http.put('/product', updatedProd);
    }
    deleteProduct(productId) {
        return this.http.delete('/product', {params: {'id': productId}});
    }

}
