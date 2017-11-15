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
        tax_id: new FormControl(),
        legal_name: new FormControl(),
        email: new FormControl(),
        address: new FormGroup({
            street: new FormControl(),
            exterior: new FormControl(),
            interior: new FormControl(),
            neighborhood: new FormControl(),
            zip: new FormControl()
        })
    });

    constructor(public dialogRef: MatDialogRef<ClientDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private notify: NotifyService,
                private clientService: ClientService) {
    }

    ngOnInit() {
        if (this.data) {
            this.title = 'Editar Cliente';
            this.icon = 'pe-7s-note icon';
            this.edit = true;
            // Fill client data
            this.clientForm.controls['tax_id'].setValue(this.data.tax_id, {onlySelf: true});
            this.clientForm.controls['legal_name'].setValue(this.data.legal_name, {onlySelf: true});
            this.clientForm.controls['email'].setValue(this.data.email, {onlySelf: true});
            this.clientForm.controls['address'].get('street').setValue(this.data.address.street, {onlySelf: true});
            this.clientForm.controls['address'].get('exterior').setValue(this.data.address.exterior, {onlySelf: true});
            this.clientForm.controls['address'].get('interior').setValue(this.data.address.interior, {onlySelf: true});
            this.clientForm.controls['address'].get('neighborhood').setValue(this.data.address.neighborhood, {onlySelf: true});
            this.clientForm.controls['address'].get('zip').setValue(this.data.address.zip, {onlySelf: true});
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit({value, valid}) {
        value.tax_id = value.tax_id.toUpperCase();
        value.legal_name = value.legal_name.toUpperCase();
        console.log(value);
        if (this.edit) {
            this.clientService.editClient(value, this.data.id).subscribe(
                data => {
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
