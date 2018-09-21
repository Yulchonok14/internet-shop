import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import '../../../../node_modules/rxjs/add/operator/map.d';
import {Observable} from 'rxjs/Observable';


interface Response {
    status: number;
    message: string;
    data: Array<any>;
}

@Injectable()
export class ProductService {

    constructor(private _http: HttpClient) {
    }

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getProducts(): Observable<any[]> {
        return this._http.get<Response>('/products').map(result => result.data);
    }

    addProject() {
        const newProj = {
            'name': 'NewProject',
            'projectId': '3'
        };
        return this._http.post('/project', newProj).subscribe(res => {console.log('result: ', res); });
    }

    updateProject() {
        const updatedProj = {
            'name': 'NewProjectUpdated'
        };
        return this._http.put('/project', updatedProj);
    }
    deleteProject(projectId) {
        return this._http.delete('/project', {params: {'projectId': projectId}}).subscribe(res => {console.log('result: ', res); });
    }

}
