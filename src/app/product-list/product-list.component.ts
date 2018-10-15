import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    productForm: FormGroup;
    submitted = false;

    constructor(private _productService: ProductService, private formBuilder: FormBuilder) {
        console.log('in constructor...');
        this._productService.getProducts().subscribe(responseProduct => {
            this.products = responseProduct.data;
        });
    }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            productName: ['', Validators.required],
            productImage: ['', Validators.required],
            productDescr: ['', Validators.required],
            productPrice: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.productForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.productForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)')
    }

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