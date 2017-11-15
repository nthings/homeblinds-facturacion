import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

import {NotifyService} from '../../utils/services/notify.service';
import {ProductService} from '../../utils/services/product.service';
import {conf} from '../../utils/conf';

@Component({
    selector: 'app-client-dialog',
    templateUrl: './product-dialog.component.html',
    styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
    title: String = 'Agregar Producto';
    icon: String = 'pe-7s-share icon';
    edit: Boolean = false;
    productForm = new FormGroup({
        description: new FormControl(),
        product_key: new FormControl(),
        unit_key: new FormControl(),
        price: new FormControl()
    });

    product_keys = conf.product_keys;

    units = conf.units;

    constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private notify: NotifyService,
                private productService: ProductService) {
    }

    ngOnInit() {
        if (this.data) {
            this.title = 'Editar Producto';
            this.icon = 'pe-7s-note icon';
            this.edit = true;
            // Fill client data
            this.productForm.controls['description'].setValue(this.data.description, {onlySelf: true});
            this.productForm.controls['product_key'].setValue(this.data.product_key, {onlySelf: true});
            this.productForm.controls['unit_key'].setValue(this.data.unit_key, {onlySelf: true});
            this.productForm.controls['price'].setValue(this.data.price, {onlySelf: true});
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit({value, valid}) {
        this.units.forEach((unit) => {
            if (unit.key === value.unit_key) {
                value.unit_name = unit.description;
            }
        });
        if (this.edit) {
            this.productService.editProduct(value, this.data.id).subscribe(
                data => {
                    this.dialogRef.close(true);
                },
                err => {
                    console.log(err);
                    if (err.status === 400) {
                        this.notify.error('pe-7s-close-circle', 'Producto duplicado.');
                    } else {
                        this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
                    }
                }
            );
        } else {
            this.productService.addProduct(value).subscribe(
                data => {
                    this.dialogRef.close(true);
                },
                err => {
                    console.log(err);
                    if (err.status === 400) {
                        this.notify.error('pe-7s-close-circle', 'Producto duplicado.');
                    } else {
                        this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
                    }
                }
            );
        }
    }
}
