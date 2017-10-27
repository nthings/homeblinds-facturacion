import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

import { NotifyService } from '../../utils/services/notify.service';
import { RoleService } from '../../utils/services/role.service';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.css']
})
export class RolesDialogComponent implements OnInit {
  title:String = "Agregar Rol";
  icon:String = "pe-7s-id icon";
  edit:Boolean = false;
  roleForm = new FormGroup ({
    name: new FormControl(),
    desc: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<RolesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private notify: NotifyService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if(this.data){
      console.log(this.data);
      this.title = "Editar Rol";
      this.icon = "pe-7s-note icon";
      this.edit = true;
      // this.passMessage="Dejar en blanco la contraseña si no deseeas cambiarla";

      //Fill user data
      this.roleForm.controls['name'].setValue(this.data.name, { onlySelf: true });
      this.roleForm.controls['desc'].setValue(this.data.desc, { onlySelf: true });
    
    }
  }

  onSubmit({ value, valid }) {
    value.name = value.name.toUpperCase();

    if(this.edit){
      this.roleService.editRole(value, this.data._id).subscribe(
          data => {
              console.log(data);
              this.dialogRef.close(true);
          },
          err =>{
              console.log(err);
              if(err.status === 400){
                this.notify.error("pe-7s-close-circle", "Role duplicado.");
              }else{
                  this.notify.error("pe-7s-close-circle", "Error de sistema. Verificar con el administrador.");
              }
          }
      )
    }else{

      this.roleService.addRole(value).subscribe(
        data => {
            console.log(data);
            this.dialogRef.close(true);
        },
        err =>{
          console.log(err);
          if(err.status === 400){
              this.notify.error("pe-7s-close-circle", "Role duplicado.");
          }else{
              this.notify.error("pe-7s-close-circle", "Error de sistema. Verificar con el administrador.");
          }
        }
      );
    }
  }

}
