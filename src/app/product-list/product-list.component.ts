import {Component, OnInit} from '@angular/core';

import {Product} from '../product';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [{
        id: 1000,
        name: 'skirt',
        image: '',
        description: '',
        price: 30
    }];

    constructor() {}

    ngOnInit() {}
}