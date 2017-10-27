import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {environment} from 'environments/environment';
import 'rxjs/add/operator/map';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class DepartmentService {
    constructor(private http: Http,
                private auth: AuthenticationService) {
    }

    public getAll() {
        return this.http.get(environment.services + '/departments/all', this.auth.options).map(res => res.json());
    };

    public addDepartment(department) {
        return this.http.post(environment.services + '/departments/add', department, this.auth.options);
    }

    public editDepartment(department, id) {
        return this.http.post(environment.services + '/departments/edit/' + id, department, this.auth.options);
    }

    public delete(id) {
        return this.http.delete(environment.services + '/departments/delete/' + id, this.auth.options);
    }

    public get(id) {
        return this.http.get(environment.services + '/departments/get/' + id, this.auth.options).map(res => res.json());
    }

}
