import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {trigger, state, style, animate, transition} from '@angular/animations';

import {TableData} from '../utils/interfaces/TableData';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';

import {NotifyService} from '../utils/services/notify.service';
import {ProductService} from '../utils/services/product.service';
import {ProductDialogComponent} from '../dialogs/product-dialog/product-dialog.component';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css'],
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
export class ProductosComponent implements OnInit {
    states;
    state;
    public tableProducts: TableData;

    constructor(public dialog: MatDialog,
                private notify: NotifyService,
                private productService: ProductService) {
    }

    ngOnInit() {
        this.tableProducts = {
            columns: ['Tipo de Producto', 'Descripción', 'Unidad', 'Precio Unitario', 'Fecha de Creación', 'Acciones'],
            rows: []
        };

        this.state = 'inactive';
        this.getProducts();

    }

    onResize(event) {
        if (event.target.innerWidth < 992) {
            this.states = new Array(this.tableProducts.rows.length).fill('active');
            this.state = 'active';
        }
    }

    getProducts() {
        this.productService.getAll().subscribe(data => {
            this.tableProducts.rows = data;
            this.states = new Array(this.tableProducts.rows.length).fill('inactive');
        });

        // this.dataSource = new UsersDataSource(this.productService);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ProductDialogComponent, {
            width: '500px',
            data: null
        } as MatDialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success('pe-7s-check', 'Producto agregado correctamente');
                this.getProducts();
            }
        });
    }

    openEditProductDialog(product): void {
        const dialogRef = this.dialog.open(ProductDialogComponent, {
            width: '500px',
            data: product
        } as MatDialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success('pe-7s-check', 'Producto editado correctamente');
                this.getProducts();
            }
        });
    }

    openDeleteProductDialog(product): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: {_id: product.id, message: product.description, service: this.productService, title: 'Eliminar'}
        } as MatDialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success('pe-7s-check', 'Producto Eliminado correctamente.');
                this.getProducts();
            }
        });
    }
}
