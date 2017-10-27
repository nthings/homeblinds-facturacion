import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

import { NotifyService } from '../../utils/services/notify.service';
import { DepartmentService } from '../../utils/services/department.service';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css']
})
export class DepartmentDialogComponent implements OnInit {
  title:String = "Agregar Departamento";
  icon:String = "pe-7s-share icon";
  edit:Boolean = false;
  departmentForm = new FormGroup ({
    name: new FormControl(),
    desc: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: NotifyService,
    private departmentService: DepartmentService) { }

  ngOnInit() {
    if(this.data){
      console.log(this.data);
      this.title = "Editar Departamento";
      this.icon = "pe-7s-note icon";
      this.edit = true;
      // this.passMessage="Dejar en blanco la contraseña si no deseeas cambiarla";

      //Fill user data
      this.departmentForm.controls['name'].setValue(this.data.name, { onlySelf: true });
      this.departmentForm.controls['desc'].setValue(this.data.desc, { onlySelf: true });
    
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit({ value, valid }) {
    value.name = value.name.toUpperCase();

    if(this.edit){
      this.departmentService.editDepartment(value, this.data._id).subscribe(
          data => {
              console.log(data);
              this.dialogRef.close(true);
          },
          err =>{
              console.log(err);
              if(err.status === 400){
                this.notify.error("pe-7s-close-circle", "Departamento duplicado.");
              }else{
                  this.notify.error("pe-7s-close-circle", "Error de sistema. Verificar con el administrador.");
              }
          }
      )
    }else{

      this.departmentService.addDepartment(value).subscribe(
        data => {
            console.log(data);
            this.dialogRef.close(true);
        },
        err =>{
          console.log(err);
          if(err.status === 400){
              this.notify.error("pe-7s-close-circle", "Departamento duplicado.");
          }else{
              this.notify.error("pe-7s-close-circle", "Error de sistema. Verificar con el administrador.");
          }
        }
      );
    }
  }
}
