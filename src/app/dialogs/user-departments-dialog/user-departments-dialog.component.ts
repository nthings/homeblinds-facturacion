import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {UserService} from '../../utils/services/user.service';
import {TableData} from '../../utils/interfaces/TableData';
import {DepartmentService} from '../../utils/services/department.service';
import {RoleService} from '../../utils/services/role.service';

@Component({
    selector: 'app-departments-dialog',
    templateUrl: 'user-departments-dialog.component.html',
})
export class UserDepartmentsDialogComponent implements OnInit {
    title: String = 'Departamentos';
    icon: String = 'pe-7s-share';
    public tableDepartments: TableData;
    simpleMode;

    constructor(public dialogRef: MatDialogRef<UserDepartmentsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private userService: UserService,
                private departmentService: DepartmentService,
                private roleService: RoleService) {
    }

    ngOnInit() {
        this.simpleMode = localStorage.getItem('simpleMode') === 'true' || false;

        this.tableDepartments = {
            columns: ['Nombre', 'Descripción', 'Roles', ''],
            rows: []
        };

        // Traer los departamentos y los roles de la base de datos en base a su ID
        this.data.departamentos.forEach((departamento) => {
            this.departmentService.get(departamento.departamento).subscribe(
                resultDepartment => {
                    const result: any = resultDepartment;
                    const row = {
                        name: result.name,
                        desc: result.desc,
                        roles: []
                    };
                    departamento.roles.forEach((rol) => {
                        this.roleService.get(rol).subscribe(
                            resultRole => {
                                const resultRol: any = resultRole;
                                row.roles.push({name: resultRol.name, desc: resultRol.desc});
                            }
                        );
                    });
                    this.tableDepartments.rows.push(row);
                }
            );
        });
    }

    simple(): void {
        localStorage.setItem('simpleMode', this.simpleMode.toString());
    }
}
