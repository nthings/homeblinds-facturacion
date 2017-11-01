import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

import {NotifyService} from '../../utils/services/notify.service';
import {ClientService} from '../../utils/services/client.service';

@Component({
    selector: 'app-client-dialog',
    templateUrl: './client-dialog.component.html',
    styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {
    title: String = 'Agregar Cliente';
    icon: String = 'pe-7s-share icon';
    edit: Boolean = false;
    clientForm = new FormGroup({
        rfc: new FormControl(),
        razonsocial: new FormControl(),
        email: new FormControl()
    });

    constructor(public dialogRef: MatDialogRef<ClientDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private notify: NotifyService,
                private clientService: ClientService) {
    }

    ngOnInit() {
        if (this.data) {
            console.log(this.data);
            this.title = 'Editar Cliente';
            this.icon = 'pe-7s-note icon';
            this.edit = true;
            // Fill client data
            this.clientForm.controls['rfc'].setValue(this.data.rfc, {onlySelf: true});
            this.clientForm.controls['razonsocial'].setValue(this.data.razonsocial, {onlySelf: true});
            this.clientForm.controls['email'].setValue(this.data.email, {onlySelf: true});
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit({value, valid}) {
        value.rfc = value.rfc.toUpperCase();
        value.razonsocial = value.razonsocial.toUpperCase();
        if (this.edit) {
            this.clientService.editClient(value, this.data._id).subscribe(
                data => {
                    console.log(data);
                    this.dialogRef.close(true);
                },
                err => {
                    console.log(err);
                    if (err.status === 400) {
                        this.notify.error('pe-7s-close-circle', 'Cliente duplicado.');
                    } else {
                        this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
                    }
                }
            );
        } else {
            this.clientService.addClient(value).subscribe(
                data => {
                    console.log(data);
                    this.dialogRef.close(true);
                },
                err => {
                    console.log(err);
                    if (err.status === 400) {
                        this.notify.error('pe-7s-close-circle', 'Cliente duplicado.');
                    } else {
                        this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
                    }
                }
            );
        }
    }
}
