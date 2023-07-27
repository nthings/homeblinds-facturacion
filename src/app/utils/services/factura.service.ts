import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class FacturaService {
    constructor(private http: HttpClient,
                private auth: AuthenticationService) {
    }

    public getAll() {
        return this.http.get('/invoices/all', this.auth.options);
    }

    public addFactura(factura) {
        return this.http.post('/invoices/add', factura, this.auth.options);
    }

    public delete(id, motive) {
        return this.http.delete(`/invoices/cancel/${id}?motive=${reason}`, this.auth.options);
    }

    public get(id) {
        return this.http.get('/invoices/get/' + id, this.auth.options);
    }

    public send(id) {
        return this.http.get('/invoices/send/' + id, this.auth.options);
    }

    public download(id) {
        const options = this.auth.options;
        options.responseType = 'blob';
        options['Content-Type'] = 'application/zip';
        return this.http.get('/invoices/download/' + id, options).map(res => new Blob([res], {type: 'application/zip'}));
    }
}
