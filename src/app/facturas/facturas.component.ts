import {Component, OnInit} from '@angular/core';
import {TableData} from '../utils/interfaces/TableData';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NotifyService} from '../utils/services/notify.service';
import {FacturaService} from '../utils/services/factura.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {ConceptosDialogComponent} from '../dialogs/conceptos-dialog/conceptos-dialog.component';

@Component({
    selector: 'app-facturas',
    templateUrl: './facturas.component.html',
    styleUrls: ['./facturas.component.css'],
    animations: [
        trigger('buttons', [
            state('inactive', style({
                transform: 'translateX(100%)',
                opacity: 0
            })),
            state('active', style({
                transform: 'translateX(0%)',
                opacity: 1
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out')),
        ]),
        trigger('column', [
            state('inactive', style({
                opacity: 0
            })),
            state('active', style({
                opacity: 1
            })),
            transition('inactive => active', animate('80ms ease-in')),
            transition('active => inactive', animate('80ms ease-out')),
        ])
    ]
})
export class FacturasComponent implements OnInit {
    states;
    state;
    public tableFacturas: TableData;

    constructor(public dialog: MatDialog,
                private notify: NotifyService,
                private facturaService: FacturaService) {
    }

    ngOnInit() {
        this.tableFacturas = {
            columns: [
                'Cliente',
                'Forma de Pago',
                'Sub-Total',
                'I.V.A.',
                'Total Neto',
                'Fecha de Creación',
                'Estatus',
                'Conceptos',
                'Acciones'
            ],
            rows: []
        };
        this.state = 'inactive';
        this.getFacturas();
    }

    onResize(event) {
        if (event.target.innerWidth < 992) {
            this.states = new Array(this.tableFacturas.rows.length).fill('active');
            this.state = 'active';
        }
    }

    getFacturas() {
        this.facturaService.getAll().subscribe(data => {
            this.tableFacturas.rows = data;
            this.states = new Array(this.tableFacturas.rows.length).fill('inactive');
        });
    }

    openConceptosDialog(factura): void {
        const dialogRef = this.dialog.open(ConceptosDialogComponent, {
            width: '500px',
            data: factura.items
        } as MatDialogConfig);
    }

    sendFactura(id) {
        this.facturaService.send(id).subscribe(
            data => {
                this.notify.success('pe-7s-check', 'Factura enviada correctamente');
            },
            error => {
                this.notify.error('pe-7s-close-circle', `Error. ${err}` + error);
            }
        );
    }

    download(id): void {
        this.facturaService.download(id).subscribe(
            zip => {
                const url = window.URL.createObjectURL(zip);
                window.open(url);
            }
        );
    }

    openDeleteDialog(factura): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: {_id: factura.id, message: 'Factura ' + factura.id, service: this.facturaService, title: 'Cancelar'}
        } as MatDialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success('pe-7s-check', 'Factura cancelada correctamente');
                this.getFacturas();
            }
        });
    }
}
