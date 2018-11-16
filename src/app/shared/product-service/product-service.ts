import { Product } from '../../product';

import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { Observable} from 'rxjs';


interface ResponseArray {
    status: number;
    message: string;
    data: Product[];
}

interface ResponseSingle {
    status: number;
    message: string;
    data: Product;
}

@Injectable()
export class ProductService {

    private productsUrl = 'products';

    constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
        this.productsUrl = origin ? `${origin}${this.productsUrl}` : this.productsUrl;
    }

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getProducts(): Observable<ResponseArray> {
        return this.http.get<ResponseArray>(this.productsUrl);
    }

    getProductById(productId): Observable<ResponseSingle> {
        return this.http.get<ResponseSingle>('/product', {params: {'productId': productId}});
    }

    addProduct(formData) {
        return this.http.post('/product', formData);
    }

    updateProduct(updatedProduct) {
        console.log('updatedProduct: ', updatedProduct);
        return this.http.put('/product', updatedProduct);
    }
    deleteProduct(productId) {
        return this.http.delete('/product', {params: {'id': productId}});
    }

}
