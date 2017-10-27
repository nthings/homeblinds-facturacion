import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroup, FormArray, FormBuilder} from '@angular/forms';

import { UserService } from '../../utils/services/user.service';
import { NotifyService } from '../../utils/services/notify.service';
import {DepartmentService} from "../../utils/services/department.service";
import {RoleService} from "../../utils/services/role.service";


@Component({
    selector: 'user-dialog',
    templateUrl: 'user-dialog.component.html',
})
export class UserDialogComponent implements OnInit {
    title:String = "Agregar Usuario";
    icon:String = "pe-7s-add-user";
    edit:Boolean = false;
    passMessage:String = "";
    userForm:FormGroup = new FormGroup ({
        numeroempleado: new FormControl(),
        nombre: new FormControl(),
        apellidos: new FormControl(),
        fechadenacimiento: new FormControl(),
        telefono: new FormControl(),
        email: new FormControl(),
        username: new FormControl(),
        password: new FormControl(),
        bloqueado: new FormControl(),
        departamentos: new FormArray([
            new FormGroup({
                departamento: new FormControl(),
                roles: new FormArray([
                    new FormControl()
                ])
            })
        ])
    });
    departments: any[];
    roles: any[];

    constructor(
        public dialogRef: MatDialogRef<UserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService,
        private notify: NotifyService,
        private departmentService: DepartmentService,
        private rolesService: RoleService) { }

    ngOnInit() {
        this.departmentService.getAll().subscribe(
            departments => {
                this.departments = departments;
            }
        );
        this.rolesService.getAll().subscribe(
            roles => {
                this.roles = roles;
            }
        );
        if (this.data) {
            console.log(this.data);
            this.title = "Editar Usuario";
            this.icon = "pe-7s-note";
            this.edit = true;
            this.passMessage="Dejar en blanco la contraseña si no deseeas cambiarla";

            //Fill user data
            this.userForm.controls['numeroempleado'].setValue(this.data.numeroempleado, { onlySelf: true });
            this.userForm.controls['nombre'].setValue(this.data.nombre, { onlySelf: true });
            this.userForm.controls['apellidos'].setValue(this.data.apellidos, { onlySelf: true });
            this.userForm.controls['fechadenacimiento'].setValue(this.data.fechadenacimiento, { onlySelf: true });
            this.userForm.controls['telefono'].setValue(this.data.telefono, { onlySelf: true });
            this.userForm.controls['email'].setValue(this.data.email, { onlySelf: true });
            this.userForm.controls['username'].setValue(this.data.username, { onlySelf: true });
            this.userForm.controls['password'].setValue(this.data.password, { onlySelf: true });
            this.userForm.controls['bloqueado'].setValue(this.data.bloqueado, { onlySelf: true });

            // Fill departments and role data
            let departamentos:FormArray = this.userForm.get('departamentos') as FormArray;
            for(let a = 0; a < this.data.departamentos.length; a++){
                if(a != 0) this.addDepartamento();
                departamentos.at(a).get("departamento").setValue(this.data.departamentos[a].departamento, { onlySelf: true});
                for(let b = 0; b < this.data.departamentos[a].roles.length; b++){
                    if(b != 0) this.addRol(a);
                    let roles:FormArray = departamentos.at(a).get("roles") as FormArray;
                    roles.at(b).setValue(this.data.departamentos[a].roles[b], { onlySelf: true});
                }
            }
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addDepartamento(): void{
        let departamentos:FormArray = this.userForm.get('departamentos') as FormArray;
        let formControl:any = new FormControl();
        departamentos.push(new FormGroup({
            departamento: formControl,
            roles: new FormArray([
                new FormControl()
            ])
        }));
    }

    removeDepartamento(index): void {
        let departamentos:FormArray = this.userForm.get('departamentos') as FormArray;
        departamentos.removeAt(index);
    }

    addRol(index): void{
        let departamentos:FormArray = this.userForm.get('departamentos') as FormArray;
        let roles: FormArray = departamentos.controls[index].get("roles") as FormArray;

        roles.push(new FormControl());
    }

    removeRol(departmentIndex, roleIndex): void{
        let departamentos:FormArray = this.userForm.get('departamentos') as FormArray;
        let roles: FormArray = departamentos.controls[departmentIndex].get("roles") as FormArray;
        roles.removeAt(roleIndex);
    }

    onSubmit({ value, valid }) {
        console.log(value, valid);
        value.bloqueado = value.bloqueado || false;
        if (this.edit) {
            this.userService.editUser(value, this.data._id).subscribe(
                data => {
                    console.log(data);
                    this.dialogRef.close(true);
                },
                err => {
                    console.log(err);
                    if(err.status === 400){
                        this.notify.error("pe-7s-close-circle", "Numero de empleado/Nombre de usuario duplicados.");
                    }else{
                        this.notify.error("pe-7s-close-circle", "Error de sistema. Verificar con el administrador.");
                    }
                }
            )
        }else{
            value.nuevo = true;
            this.userService.addUser(value).subscribe(
                data => {
                    console.log(data);
                    this.dialogRef.close(true);
                },
                err =>{
                    console.log(err);
                    if(err.status === 400){
                        this.notify.error("pe-7s-close-circle", "Numero de empleado/Nombre de usuario duplicados.");
                    }else{
                        this.notify.error("pe-7s-close-circle", "Error de sistema. Verificar con el administrador.");
                    }
                }
            );
        }
    }

}
