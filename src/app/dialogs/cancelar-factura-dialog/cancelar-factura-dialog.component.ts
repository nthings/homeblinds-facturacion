import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {NotifyService} from '../../utils/services/notify.service';
import {FacturaService} from '../../utils/services/factura.service';
import {conf} from '../../utils/conf';

@Component({
    selector: 'app-cancelar-factura-dialog',
    templateUrl: './cancelar-factura-dialog.component.html',
    styleUrls: ['./cancelar-factura-dialog.component.css']
})

export class CancelarFacturaDialogComponent {
    cancelFacturaForm = new FormGroup({
        invoiceCancelationReason: new FormControl(),
    });
    invoiceCancelationReasons = conf.invoiceCancelationReasons;

    constructor(public dialogRef: MatDialogRef<CancelarFacturaDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private facturaService: FacturaService,
                private notify: NotifyService) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit({value, valid}) {
        this.facturaService.delete(this.data._id, value.invoiceCancelationReason).subscribe(
            data => {
                this.dialogRef.close(true);
            },
            err => {
                console.log(err);
                this.notify.error('pe-7s-close-circle', `Error. ${err.error}`);
            }
        );
    }
}
