import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NotifyService} from '../services/notify.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private notify: NotifyService,
                private router: Router,
                private auth: AuthenticationService) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.auth.emitLoggedIn();
            return true;
        }

        // not logged in so redirect to login page
        this.auth.emitLoggedOut();
        this.notify.error('pe-7s-delete-user', 'No haz iniciado sesión');
        this.router.navigate(['/login']);
        return false;
    }
}
