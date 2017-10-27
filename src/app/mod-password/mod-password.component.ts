import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {NotifyService} from '../utils/services/notify.service';
import {UserService} from '../utils/services/user.service';
import {AuthenticationService} from "../utils/services/authentication.service";

@Component({
    selector: 'app-mod-password',
    templateUrl: './mod-password.component.html',
    styleUrls: ['./mod-password.component.css']
})
export class ModPasswordComponent implements OnInit {
    userForm = new FormGroup({
        oldPassword: new FormControl(),
        password: new FormControl(),
        rePassword: new FormControl()
    });

    constructor(private notify: NotifyService,
                private userService: UserService,
                private auth: AuthenticationService) {
    }

    ngOnInit() {
    }

    onSubmit({value, valid}) {
        value.username = this.auth.user.username;
        console.log(value);
        if (value.password !== value.rePassword) {
            this.notify.error('pe-7s-close-circle', 'Password diferentes.');
        } else {
            this.userService.changePassword(value).subscribe(
                response => {
                    this.notify.success('pe-7s-check', 'Password Actualizado.');
                    this.auth.logout();
                },
                err => {
                    this.notify.error('pe-7s-close-circle', 'Error cambiando password.');
                }
            );
        }
    }
}
