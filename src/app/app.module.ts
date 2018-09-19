import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {NgModule}  from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProductListComponent,
        ProductDetailComponent,
        HeaderComponent,
        FooterComponent],
    imports: [CommonModule, BrowserModule, AppRoutingModule],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}