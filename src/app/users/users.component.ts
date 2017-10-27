import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {trigger, state, style, animate, transition} from '@angular/animations';

import {TableData} from '../utils/interfaces/TableData';
import {UserDialogComponent} from '../dialogs/user-dialog/user-dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';

import {UserService} from '../utils/services/user.service';
import {NotifyService} from '../utils/services/notify.service';
import {UserDepartmentsDialogComponent} from "../dialogs/user-departments-dialog/user-departments-dialog.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
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
export class UsersComponent implements OnInit {
    states;
    state;
    public tableClients: TableData;

    constructor(public dialog: MatDialog,
                private notify: NotifyService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.tableClients = {
            columns: ['N° Empleado', 'Nombre', 'Apellidos', 'Fecha De Nacimiento', 'Teléfono', 'Email', 'Nombre de Usuario', 'Departamentos', 'Acciones'],
            rows: []
        };

        this.state = "inactive";
        this.getUsers();

    }

    getUsers() {
        this.userService.getAll().subscribe(data => {
            console.log(data);
            this.tableClients.rows = data;
            this.states = new Array(this.tableClients.rows.length).fill('inactive');
        });

        // this.dataSource = new UsersDataSource(this.userService);
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(UserDialogComponent, {
            width: '500px',
            data: null
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success("pe-7s-check", "Usuario agregado correctamente");
                this.getUsers();
            }
        });
    }

    openEditUserDialog(user): void {
        let dialogRef = this.dialog.open(UserDialogComponent, {
            width: '500px',
            data: user
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success("pe-7s-check", "Usuario editado correctamente");
                this.getUsers();
            }
        });
    }

    openDeleteUserDialog(user): void {
        let dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            data: {_id: user._id, message: user.nombre + ' ' + user.apellidos, service: this.userService}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notify.success("pe-7s-check", "Usuario Eliminado correctamente");
                this.getUsers();
            }
        });
    }

}
