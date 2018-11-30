import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable} from '@angular/core';

import { Login } from '../../login';

interface ResponseArray {
    status: number;
    message: string;
    data: Login[];
}

@Injectable()
export class LoginService {
    private loginUrl = '/api/login';

    constructor(private http: HttpClient){}

    getLogin(): Observable<ResponseArray> {
        return this.http.get<ResponseArray>(this.loginUrl);
    }
}
