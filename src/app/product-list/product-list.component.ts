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
    products: Product[];

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
            productCode: ['', Validators.required],
            productName: ['', Validators.required],
            productImage: ['', Validators.required],
            productDescr: ['', Validators.required],
            productPrice: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.productForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.productForm.invalid) {
            return;
        } else {
            console.log('Product: ', this.productForm);
            this._productService.addProduct(this.productForm.value).subscribe(() => {
                this._productService.getProducts().subscribe(responseProduct => {
                    this.products = responseProduct.data;
                    //this.productForm.reset();
                });
            });
        }
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
}