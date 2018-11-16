import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/login-service/login-service';
import { environment } from '../../environments/environment.prod';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    showForm = false;
    login: any;
    env = environment;

    constructor(private formBuilder: FormBuilder, private _loginService: LoginService) {}

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
        console.log('in onSubmit', this.loginForm);
        console.log('this.login[0]', this.login[0]);
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        } else {
            if(this.login[0].login === this.loginForm.value.login.trim() && this.login[0].password ===
                this.loginForm.value.password.trim()) {
                this.showForm = false;
                this.env.isAdmin = true;
            }
        }
    }
}