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
        return this.http.get('/facturas/all', this.auth.options);
    }

    public addFactura(factura) {
        return this.http.post('/facturas/add', factura, this.auth.options);
    }

    public delete(id) {
        return this.http.delete('/facturas/cancel/' + id, this.auth.options);
    }

    public get(id) {
        return this.http.get('/facturas/get/' + id, this.auth.options);
    }

    public send(id) {
        return this.http.get('/facturas/send/' + id, this.auth.options);
    }

    public download(id) {
        const options = this.auth.options;
        options.responseType = 'arraybuffer';
        console.log(options);
        return this.http.get('/facturas/download/' + id, options).map(res => new Blob([res], {type: 'application/zip'}));
    }
}
