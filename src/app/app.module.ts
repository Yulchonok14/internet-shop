import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgModule }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductService } from './shared/product-service/product-service'
import { PagerService } from "./shared/page-service/page-service";
import { SearchService } from "./shared/search-service/search-service1";
import { LoginService } from "./shared/login-service/login-service";

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EllipsisModule } from 'ngx-ellipsis';
import { SlideshowModule } from 'ng-simple-slideshow';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProductListComponent,
        ProductDetailComponent,
        HeaderComponent,
        FooterComponent],
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({ appId: 'internet-shop' }),
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        EllipsisModule,
        SlideshowModule],
    exports: [],
    providers: [ ProductService, PagerService, SearchService, LoginService ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string) {
        const platform = isPlatformBrowser(platformId) ?
            'in the browser' : 'on the server';
        console.log(`Running ${platform} with appId=${appId}`);
    }
}