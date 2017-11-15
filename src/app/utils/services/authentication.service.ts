import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    public token: string;
    public user = {nombre: 'No haz iniciado sesión', logged: false, username: null};
    // Observable string sources
    private emitUserLoggedIn = new Subject<any>();
    private emitUserLoggedOut = new Subject<any>();
    // Observable string streams
    loggedInEmitted$ = this.emitUserLoggedIn.asObservable();
    loggedOutEmitted$ = this.emitUserLoggedOut.asObservable();

    // add authorization header with jwt token
    options;
    constructor(private http: HttpClient) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.user = currentUser && currentUser.user;
        this.options = {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)};
    }

    login(user): Observable<boolean> {
        return this.http.post('/login', user)
            .map((response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().token;
                const userResponse = response.json() && response.json().user;
                if (token) {
                    // set token property
                    this.token = token;
                    this.user = userResponse;
                    this.user.logged = true;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ user: userResponse, token: token }));

                    // return true to indicate successful login
                    this.emitLoggedIn();
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.emitLoggedOut();
    }
    // Service message commands
    emitLoggedIn() {
        this.emitUserLoggedIn.next(this.user);
    }

    emitLoggedOut() {
        this.user = {nombre: 'No haz iniciado sesión', logged: false, username: null};
        this.emitUserLoggedOut.next(this.user);
    }

    useBy(key) {
        return this.http.post('/change', {key: key}, this.options);
    }
}
