import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient,
                private auth: AuthenticationService) {
    }

    public getAll() {
        return this.http.get('/products/all', this.auth.options);
    }

    public addProduct(product) {
        return this.http.post('/products/add', product, this.auth.options);
    }

    public editProduct(product, id) {
        return this.http.post('/products/edit/' + id, product, this.auth.options);
    }

    public delete(id) {
        return this.http.delete('/products/delete/' + id, this.auth.options);
    }

    public get(id) {
        return this.http.get('/products/get/' + id, this.auth.options);
    }

}
