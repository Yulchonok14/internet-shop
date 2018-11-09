import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ProductService} from '../shared/product-service/product-service'
import {Product} from '../product';
import {OnDestroy} from "../../../node_modules/@angular/core/src/metadata/lifecycle_hooks";
import * as $ from 'jquery';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    products: Product[];

    productForm: FormGroup;
    submitted = false;

    private productsChanges: MutationObserver;

    constructor(private _productService: ProductService, private formBuilder: FormBuilder) {

        this._productService.getProducts().subscribe(responseProduct => {
            this.products = responseProduct.data;
        });

        $(document).ready(function() {
            const productCards = document.querySelectorAll('.product-card');
            let productCardWidth = 0;
            if (productCards.length !== 0) {
                console.log('productCards: ', productCards);
                let productCard = productCards[0] as HTMLElement;
                productCardWidth = parseInt(getComputedStyle(productCard).width);
                for (let i = 0; i < productCards.length; i++) {
                    productCard = productCards[i] as HTMLElement;
                    console.log('productCardWidth: ', productCardWidth);
                    console.log('productCard[i]: ', productCard);
                    productCard.style.height = productCardWidth + 'px';
                }
            }


            const products = document.querySelector('.products');

            this.productsChanges = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    console.log('mutation.addedNodes: ', mutation.addedNodes);
                    if(mutation.addedNodes.length !== 0) {
                        let newProductCard = mutation.addedNodes[0] as HTMLElement;
                        newProductCard.style.height = parseInt(getComputedStyle(newProductCard).width) + 'px';
                    }
                });
            });

            this.productsChanges.observe(products, {
                attributes:true,
                childList: true,
                characterData: true
            });
        })
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

    ngOnDestroy(): void {
        //this.productsChanges.disconnect();
    }

    // convenience getter for easy access to form fields
    get f() { return this.productForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.productForm.invalid) {
            return;
        } else {
            var file = $('#productAvatar').prop('files')[0];
            var formData = new FormData();
            formData.append("productImage", file);
            formData.append("productCode", this.productForm.value.productCode);
            formData.append("productName", this.productForm.value.productName);
            formData.append("productDescr", this.productForm.value.productDescr);
            formData.append("productPrice", this.productForm.value.productPrice);
            this._productService.addProduct(formData).subscribe(() => {
                this._productService.getProducts().subscribe(responseProduct => {
                    this.products = responseProduct.data;
                    this.clearForm(this.productForm);
                });
            });
        }
    }

    clearForm(form) {
        $(':input', form).each(function() {
            var type = this.type;
            var tag = this.tagName.toLowerCase();
            console.log('input: ', this);
            if (type == 'text' || type == 'password' || tag == 'textarea') {
                console.log('input text');
                this.value = "";
            } if(type == 'file') {
                $(this).replaceWith($(this).val('').clone( true ));
                console.log('input file');
            }
        });
    }

    delete(product) {
        console.log('deleting product: ', product);
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

    slideDown() {
        document.getElementById('slide-down').style.display = 'none';
        const newProductContainer = document.getElementsByClassName('new-product-container')[0] as HTMLElement;
        newProductContainer.style.display = 'block';
        const slideUpBtn = document.getElementById('slide-up');
        slideUpBtn.style.display = 'block';
    }

    slideUp() {
        document.getElementById('slide-up').style.display = 'none';
        const newProductContainer = document.getElementsByClassName('new-product-container')[0] as HTMLElement;
        newProductContainer.style.display = 'none';
        const slideDownBtn = document.getElementById('slide-down');
        slideDownBtn.style.display = 'block';
    }
}