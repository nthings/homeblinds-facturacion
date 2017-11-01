import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NotifyService} from '../utils/services/notify.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../utils/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
    });

    constructor(private notify: NotifyService,
                private router: Router,
                private auth: AuthenticationService) {
    }

    ngOnInit() {
    }

    onSubmit({value, valid}) {
        console.log(value);
        this.auth.login(value).subscribe(result => {
                if (result === true) {
                    let nombre = this.auth.user.nombre;
                    if (nombre.indexOf(' ') >= 0) {
                        nombre = nombre.substr(0, nombre.indexOf(' '));
                    }
                    this.notify.success('pe-7s-like2', 'Bienvenido ' + nombre);
                    this.router.navigate(['/factura']);
                } else {
                    this.notify.error('pe-7s-delete-user', 'Credenciales Incorrectas.');
                }
            },
            error => {
                this.notify.error('pe-7s-delete-user', 'Credenciales Incorrectas.');
            });
    }

}
