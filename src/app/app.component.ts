import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        $(document).ready(function(){
            $('.slider').slick({
                autoplay: true
            });
        });
    }
}