import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {TableData} from '../../utils/interfaces/TableData';

@Component({
    selector: 'app-departments-dialog',
    templateUrl: 'conceptos-dialog.component.html',
})
export class ConceptosDialogComponent implements OnInit {
    title: String = 'Conceptos';
    icon: String = 'pe-7s-piggy';
    public tableConceptos: TableData;

    constructor(public dialogRef: MatDialogRef<ConceptosDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.tableConceptos = {
            columns: ['Cantidad', 'Unidad', 'Descripción', 'Valor Unitario', 'Importe'],
            rows: this.data
        };
    }
}
