import {Component, OnInit} from '@angular/core';
import {TableData} from '../utils/interfaces/TableData';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NotifyService} from '../utils/services/notify.service';
import {FacturaService} from '../utils/services/factura.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {ClientService} from '../utils/services/client.service';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {ConceptosDialogComponent} from '../dialogs/conceptos-dialog/conceptos-dialog.component';
import {Router} from '@angular/router';

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
                private facturaService: FacturaService,
                private router: Router) {
    }

    ngOnInit() {
        this.tableFacturas = {
            columns: ['Cliente', 'Forma de Pago', 'Sub-Total', 'I.V.A.', 'Total Neto', 'Fecha de Creación', 'Conceptos', 'Acciones'],
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
            console.log(data);
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
                this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.' + error);
            }
        );
    }

    download(id): void {
        this.router.navigate(['/factura/' + id]);
    }

    openDeleteDialog(factura): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: {_id: factura._id, message: 'Factura ' + factura.id, service: this.facturaService}
        } as MatDialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success('pe-7s-check', 'Factura Eliminada correctamente');
                this.getFacturas();
            }
        });
    }
}
