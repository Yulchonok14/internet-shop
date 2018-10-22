import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { ProductListComponent }      from './product-list/product-list.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';
//{ path: '', redirectTo: '/home', pathMatch: 'full' },
const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'products', component: ProductListComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
