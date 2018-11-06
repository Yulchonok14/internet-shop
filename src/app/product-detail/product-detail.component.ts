import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../shared/product-service/product-service'
import {Router} from '@angular/router';
import * as $ from 'jquery';

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

    constructor(private _productService: ProductService, private formBuilder: FormBuilder, private router: Router) {}

    ngOnInit() {
        this.productDetailForm = this.formBuilder.group({
            productCode: ['', Validators.required],
            productName: ['', Validators.required],
            productImage: ['', Validators.required],
            productDescr: ['', Validators.required],
            productPrice: ['', Validators.required]
        });

        const url_string = this.router.url;
        const productId = url_string.substr(url_string.lastIndexOf('/') + 1);
        this._productService.getProductById(productId).subscribe((responseProduct) => {
            console.log('getProductById: ', responseProduct);
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
                console.log('this.files[0].name: ', this.files[0].name);
                this.imageName = this.files[0].name;
            } else {
                this.imageName = '';
            }
        });
    }

    clearImage() {
        console.log('clear image');
        $('#file').removeClass('no-chosen-file');
        const fileInput = $('#file input[type=file]');
        fileInput.replaceWith( fileInput.val('').clone( true ) );
    }

    // convenience getter for easy access to form fields
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
}