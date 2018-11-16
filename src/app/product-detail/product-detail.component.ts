import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/product-service/product-service'
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from '../../environments/environment.prod';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    product: Product = new Product();

    productDetailForm: FormGroup;
    submitted = false;
    imageName = '';
    private sub: any;
    productId: string;
    editFlag: boolean;
    env = environment;

    constructor(private _productService: ProductService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.productDetailForm = this.formBuilder.group({
            productCode: ['', Validators.required],
            productName: ['', Validators.required],
            productImage: ['', Validators.required],
            productDescr: ['', Validators.required],
            productPrice: ['', Validators.required]
        });

        this.productId = this.route.snapshot.paramMap.get("id");
        this.editFlag = this.route.snapshot.queryParams.edit.toLowerCase() == 'true' ? true : false;

        this._productService.getProductById(this.productId).subscribe((responseProduct) => {
            this.imageName = $('#file input[type=file]').val();
            const imagePath = responseProduct.data.image;
            const namePos = imagePath.lastIndexOf('\\');
            this.product = responseProduct.data;
            this.imageName = imagePath.slice(namePos+1);
            $('#file').addClass('no-chosen-file');
        });

        $('#file input[type=file]').on('change',function(){
            $('#file').removeClass('no-chosen-file');
            if(this.files[0] && this.files[0].name) {
                this.imageName = this.files[0].name;
                $('.product-image').attr('src', 'uploads/' + this.imageName);
            } else {
                this.imageName = '';
                $('.product-image').attr('src', '');
            }
        });
    }

    displayEditSection() {
        if(this.editFlag){
            return {display: 'block'};
        } else {
            return {display: 'none'};
        }
    }

    clearImage() {
        $('#file').removeClass('no-chosen-file');
        const fileInput = $('#file input[type=file]');
        fileInput.replaceWith( fileInput.val('').clone( true ) );
        this.product.image = '#';
    }

    getUrlParams (url) {
        if (typeof url == 'undefined') {
            url = window.location.search
        }
        var url = url.split('#')[0]; // Discard fragment identifier.
        var urlParams = {};
        var queryString = url.split('?')[1];
        if (!queryString) {
            if (url.search('=') !== false) {
                queryString = url
            }
        }
        if (queryString) {
            const keyValuePairs = queryString.split('&');
            for (let i = 0; i < keyValuePairs.length; i++) {
                let keyValuePair = keyValuePairs[i].split('=');
                let paramName = keyValuePair[0];
                let paramValue = keyValuePair[1] || '';
                urlParams[paramName] = decodeURIComponent(paramValue.replace(/\+/g, ' '))
            }
        }
        return urlParams
    }

    get f() { return this.productDetailForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log('onSubmit', this.productDetailForm);

        if (this.productDetailForm.invalid) {
            return;
        } else {
            console.log('ProductDetail: ', this.productDetailForm);
            var file = $('#file input[type=file]').prop('files')[0];
            var formData = new FormData();
            formData.append("productImage", file);
            formData.append("productCode", this.productDetailForm.value.productCode);
            formData.append("productName", this.productDetailForm.value.productName);
            formData.append("productDescr", this.productDetailForm.value.productDescr);
            formData.append("productPrice", this.productDetailForm.value.productPrice);
            this._productService.updateProduct(formData).subscribe(() => {
                this.router.navigateByUrl('/products');
            });
        }
    }

    delete(product) {
        console.log('deleting product: ', product);
        this._productService.deleteProduct(product.id).subscribe(() => {
            this.router.navigateByUrl('/products');
        })
    }

    edit() {
        this.editFlag = !this.editFlag;
    }
}