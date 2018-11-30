import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/login-service/login-service';
import { environment } from '../../environments/environment.prod';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

//export let browserRefresh = false;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    submitted = false;
    showForm = false;
    showError = false;
    login: any;
    env = environment;
    subscription: Subscription;

    constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private router: Router,
                @Inject(PLATFORM_ID) private platformId: Object) {
        this.subscription = router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                if(!router.navigated && isPlatformBrowser(this.platformId)) {
                    this.env.isAdmin = localStorage.getItem('isAdmin') === 'true';
                }
            }
        });
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });

        this._loginService.getLogin().subscribe((responseLogin) => {
            this.login = responseLogin.data;
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        } else {
            if(this.login[0].login === this.loginForm.value.login.trim() && this.login[0].password ===
                this.loginForm.value.password.trim()) {
                this.showForm = false;
                this.showError = false;
                this.env.isAdmin = true;
                if (isPlatformBrowser(this.platformId)) {
                    localStorage.setItem('isAdmin', 'true');
                }
            } else {
                this.showError = true;
            }
        }
    }

    signOut() {
        localStorage.setItem('isAdmin', 'false');
        this.env.isAdmin = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}