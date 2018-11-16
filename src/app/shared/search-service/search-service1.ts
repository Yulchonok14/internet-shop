import { Injectable } from '@angular/core';
import { Product } from '../../product';

@Injectable()
export class SearchService {
    findProducts(query: string, products: Product[]){
        return products.filter(product => {let productData = product.id + product.name + product.price + product.description;
            if(~productData.indexOf(query)){return product}});
    }
}
