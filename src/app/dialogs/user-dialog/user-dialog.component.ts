import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

import {UserService} from '../../utils/services/user.service';
import {NotifyService} from '../../utils/services/notify.service';

@Component({
    selector: 'app-user-dialog',
    templateUrl: 'user-dialog.component.html',
})
export class UserDialogComponent implements OnInit {
    title: String = 'Agregar Usuario';
    icon: String = 'pe-7s-add-user';
    edit: Boolean = false;
    passMessage: String = '';
    userForm: FormGroup = new FormGroup({
        nombre: new FormControl(),
        apellidos: new FormControl(),
        username: new FormControl(),
        password: new FormControl(),
    });

    constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private userService: UserService,
                private notify: NotifyService) {
    }

    ngOnInit() {
        if (this.data) {
            console.log(this.data);
            this.title = 'Editar Usuario';
            this.icon = 'pe-7s-note';
            this.edit = true;
            this.passMessage = 'Dejar en blanco la contraseña si no deseeas cambiarla';

            // Fill user data
            this.userForm.controls['nombre'].setValue(this.data.nombre, {onlySelf: true});
            this.userForm.controls['apellidos'].setValue(this.data.apellidos, {onlySelf: true});
            this.userForm.controls['username'].setValue(this.data.username, {onlySelf: true});
            this.userForm.controls['password'].setValue(this.data.password, {onlySelf: true});
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit({value, valid}) {
        console.log(value, valid);
        value.bloqueado = value.bloqueado || false;
        if (this.edit) {
            this.userService.editUser(value, this.data._id).subscribe(
                data => {
                    console.log(data);
                    this.dialogRef.close(true);
                },
                err => {
                    console.log(err);
                    if (err.status === 400) {
                        this.notify.error('pe-7s-close-circle', 'Nombre de usuario duplicado.');
                    } else {
                        this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
                    }
                }
            );
        } else {
            value.nuevo = true;
            this.userService.addUser(value).subscribe(
                data => {
                    console.log(data);
                    this.dialogRef.close(true);
                },
                err => {
                    console.log(err);
                    if (err.status === 400) {
                        this.notify.error('pe-7s-close-circle', 'Nombre de usuario duplicado.');
                    } else {
                        this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
                    }
                }
            );
        }
    }

}
