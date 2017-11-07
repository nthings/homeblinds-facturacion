import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class FacturaService {
    constructor(private http: Http,
                private auth: AuthenticationService) {
    }

    public getAll() {
        return this.http.get('/facturas/all', this.auth.options).map(res => res.json());
    }

    public addFactura(factura) {
        return this.http.post('/facturas/add', factura, this.auth.options).map(res => res.json());
    }

    public editFactura(factura, id) {
        return this.http.post('/facturas/edit/' + id, factura, this.auth.options);
    }

    public delete(id) {
        return this.http.delete('/facturas/delete/' + id, this.auth.options);
    }

    public get(id) {
        return this.http.get('/facturas/get/' + id, this.auth.options).map(res => res.json());
    }

    public send(id) {
        return this.http.get('/facturas/send/' + id, this.auth.options).map(res => res.json());
    }

    public replaceClient(client) {
        return this.http.post('/facturas/replaceClient/', client, this.auth.options);
    }
}
