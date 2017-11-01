import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class ClientService {
    constructor(private http: Http,
                private auth: AuthenticationService) {
    }

    public getAll() {
        return this.http.get('/clients/all', this.auth.options).map(res => res.json());
    }

    public addClient(client) {
        return this.http.post('/clients/add', client, this.auth.options);
    }

    public editClient(client, id) {
        return this.http.post('/clients/edit/' + id, client, this.auth.options);
    }

    public delete(id) {
        return this.http.delete('/clients/delete/' + id, this.auth.options);
    }

    public get(rfc) {
        return this.http.get('/clients/get/' + rfc, this.auth.options).map(res => res.json());
    }

}
