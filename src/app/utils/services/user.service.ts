import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UserService {

    constructor(private http: HttpClient,
                private auth: AuthenticationService) {
    }

    public getAll() {
        return this.http.get('/users/all', this.auth.options);
    }

    public addUser(user) {
        return this.http.post('/users/add', user, this.auth.options);
    }

    public editUser(user, id) {
        return this.http.post('/users/edit/' + id, user, this.auth.options);
    }

    public changePassword(user) {
        return this.http.post('/users/changepass', user, this.auth.options);
    }

    public delete(userId) {
        return this.http.delete('/users/deleteUser/' + userId, this.auth.options);
    }
}
