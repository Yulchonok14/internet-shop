import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        $(document).ready(function(){
            /*$('.slider').slick({
                autoplay: true
            });*/
        });
    }
}