import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {trigger, state, style, animate, transition} from '@angular/animations';

import {TableData} from '../utils/interfaces/TableData';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';

import {NotifyService} from '../utils/services/notify.service';
import {ClientService} from '../utils/services/client.service';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {FacturaService} from '../utils/services/factura.service';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css'],
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
export class ClientesComponent implements OnInit {
    states;
    state;
    public tableClients: TableData;

    constructor(public dialog: MatDialog,
                private notify: NotifyService,
                private clientService: ClientService,
                private facturaService: FacturaService) {
    }

    ngOnInit() {
        this.tableClients = {
            columns: ['RFC', 'Razon Social', 'Fecha de Creación', 'Email', 'Acciones'],
            rows: []
        };

        this.state = 'inactive';
        this.getClients();

    }

    onResize(event) {
        if (event.target.innerWidth < 992) {
            this.states = new Array(this.tableClients.rows.length).fill('active');
            this.state = 'active';
        }
    }

    getClients() {
        this.clientService.getAll().subscribe(data => {
            this.tableClients.rows = data;
            this.states = new Array(this.tableClients.rows.length).fill('inactive');
        });

        // this.dataSource = new UsersDataSource(this.clientService);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ClientDialogComponent, {
            width: '500px',
            data: null
        } as MatDialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success('pe-7s-check', 'Cliente agregado correctamente');
                this.getClients();
            }
        });
    }

    openEditClientDialog(client): void {
        const dialogRef = this.dialog.open(ClientDialogComponent, {
            width: '500px',
            data: client
        } as MatDialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success('pe-7s-check', 'Cliente editado correctamente');
                this.getClients();
            }
        });
    }

    openDeleteClientDialog(client): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: {_id: client.id, message: client.legal_name, service: this.clientService, title: 'Eliminar'}
        } as MatDialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success('pe-7s-check', 'Cliente Eliminado correctamente.');
                this.getClients();
            }
        });
    }
}
