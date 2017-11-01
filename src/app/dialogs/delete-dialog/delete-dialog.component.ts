import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {NotifyService} from '../../utils/services/notify.service';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.css']
})

export class DeleteDialogComponent {

    constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private notify: NotifyService) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    delete() {
        this.data.service.delete(this.data._id).subscribe(
            data => {
                this.dialogRef.close(true);
            },
            err => {
                console.log(err);
                this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
            }
        );
    }

}
