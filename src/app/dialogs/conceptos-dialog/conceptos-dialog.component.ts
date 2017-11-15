import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {TableData} from '../../utils/interfaces/TableData';
import {ProductService} from '../../utils/services/product.service';

@Component({
    selector: 'app-departments-dialog',
    templateUrl: 'conceptos-dialog.component.html',
})
export class ConceptosDialogComponent implements OnInit {
    title: String = 'Conceptos';
    icon: String = 'pe-7s-piggy';
    public tableConceptos: TableData;

    constructor(public dialogRef: MatDialogRef<ConceptosDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private productService: ProductService) {
    }

    ngOnInit() {
        this.tableConceptos = {
            columns: ['Cantidad', 'Unidad', 'Descripción', 'Valor Unitario', 'Importe'],
            rows: []
        };
        this.data.forEach((item) => {
            this.productService.get(item.product.id).subscribe(
                product => {
                    this.tableConceptos.rows.push({
                        quantity: item.quantity,
                        unidad: product.unit_name,
                        description: item.description,
                        valorunitario: product.price,
                        importe: (item.quantity * product.price)
                    });
                }
            );
        });
    }
}
