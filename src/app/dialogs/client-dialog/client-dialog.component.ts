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
        // Validar RFC
        this.clientForm.controls['tax_id'].valueChanges.subscribe(
            rfc => {
                if (!this.rfcValido(rfc)) {
                    this.clientForm.controls['tax_id'].setErrors({rfcInvalid: true});
                } else {
                    // RFC Valido
                    this.clientForm.controls['tax_id'].setErrors(null);
                }
            }
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit({value, valid}) {
        value.tax_id = value.tax_id.toUpperCase();
        value.legal_name = value.legal_name.toUpperCase();
        value.address.zip = value.address.zip + '';
        value.address.interior = value.address.interior + '';
        value.address.exterior = value.address.exterior + '';
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

    rfcValido(rfc) {
        const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
        const validado = rfc.toUpperCase().match(re);

        if (!validado) {  // Coincide con el formato general del regex?
            return false;
        }

        // Separar el dígito verificador del resto del RFC
        const digitoVerificador = validado.pop();
        const rfcSinDigito = validado.slice(1).join('');
        const len = rfcSinDigito.length;
        const diccionario = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ';
        const indice = len + 1;
        let suma;
        let digitoEsperado;

        if (len === 12) {
            suma = 0;
        } else {
            suma = 481; // Ajuste para persona moral
        }
        for (let i = 0; i < len; i++) {
            suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
        }

        digitoEsperado = 11 - suma % 11;
        if (digitoEsperado === 11) {
            digitoEsperado = 0;
        } else if (digitoEsperado === 10) {
            digitoEsperado = 'A';
        }
        // El dígito verificador coincide con el esperado?
        // o es un RFC Genérico (ventas a público general)?
        if ((digitoVerificador !== digitoEsperado.toString()) && (rfcSinDigito + digitoVerificador !== 'XAXX010101000')) {
            return false;
        } else if (rfcSinDigito + digitoVerificador === 'XEXX010101000') {
            return false;
        }
        return digitoVerificador === digitoEsperado.toString();
    }

}
