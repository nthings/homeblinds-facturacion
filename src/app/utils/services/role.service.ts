import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class RoleService {
    constructor(private http: Http,
                private auth: AuthenticationService) {
    }

    public getAll() {
        return this.http.get(environment.services + '/roles/all', this.auth.options).map(res => res.json());
    }

    public addRole(role) {
        return this.http.post(environment.services + '/roles/add', role, this.auth.options);
    }

    public editRole(role, id) {
        return this.http.post(environment.services + '/roles/edit/' + id, role, this.auth.options);
    }

    public delete(id) {
        return this.http.delete(environment.services + '/roles/delete/' + id, this.auth.options);
    }

    public get(id) {
        return this.http.get(environment.services + '/roles/get/' + id, this.auth.options).map(res => res.json());
    }

}
