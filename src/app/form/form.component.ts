import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ClientDialogComponent} from '../dialogs/client-dialog/client-dialog.component';
import {NotifyService} from '../utils/services/notify.service';
import {ClientService} from '../utils/services/client.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import {FacturaService} from '../utils/services/factura.service';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../utils/services/product.service';
import {ProductDialogComponent} from '../dialogs/product-dialog/product-dialog.component';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    isMobile: Boolean = false;
    isExtraSmall: Boolean = false;
    id: String = null;
    facturaForm: FormGroup = new FormGroup({
        customer: new FormControl(),
        payment_form: new FormControl(),
        items: new FormArray([
            new FormGroup({
                quantity: new FormControl(),
                product: new FormControl(),
                importe: new FormControl()
            })
        ]),
        subtotal: new FormControl(),
        iva: new FormControl(),
        totalneto: new FormControl(),
    });

    clients: any = [];
    products: any = [];
    filteredClients: Observable<string[]>;
    filteredProducts: Observable<string[]>[];
    formasdepago = [
        {code: '01', description: 'Efectivo'},
        {code: '02', description: 'Cheque nominativo'},
        {code: '03', description: 'Transferencia electrónica de fondos'},
        {code: '04', description: 'Tarjeta de crédito'},
        {code: '05', description: 'Monedero electrónico'},
        {code: '06', description: 'Dinero electrónico'},
        {code: '08', description: 'Vales de despensa'},
        {code: '12', description: 'Dación en pago'},
        {code: '13', description: 'Pago por subrogación'},
        {code: '14', description: 'Pago por consignación'},
        {code: '15', description: 'Condonación'},
        {code: '17', description: 'Compensación'},
        {code: '23', description: 'Novación'},
        {code: '24', description: 'Confusión'},
        {code: '25', description: 'Remisión de deuda'},
        {code: '26', description: 'Prescripción o caducidad'},
        {code: '27', description: 'A satisfacción del acreedor'},
        {code: '28', description: 'Tarjeta de débito'},
        {code: '29', description: 'Tarjeta de servicios'},
        {code: '99', description: 'Por definir'},
    ];

    constructor(public dialog: MatDialog,
                private notify: NotifyService,
                private clientService: ClientService,
                private productService: ProductService,
                private facturaService: FacturaService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getClients();
        this.getProducts();

        this.filteredClients = this.facturaForm.get('customer').valueChanges
            .startWith(null)
            .map(val => val ? this.filterClientes(val) : this.clients.slice());

        const conceptos: FormArray = this.facturaForm.get('items') as FormArray;
        this.filteredProducts = [
            conceptos.at(0).get('product').valueChanges
                .startWith(null)
                .map(val => val ? this.filterProductos(val) : this.products.slice())
        ];

        // Client dont exist in autocomplete error handling
        this.facturaForm.get('customer').valueChanges.subscribe(
            id => {
                this.clients.forEach((client) => {
                    if (client.id !== id) {
                        this.facturaForm.get('customer').setErrors({clientDontExists: true});
                    } else {
                        this.facturaForm.get('customer').setErrors(null);
                    }
                });
            }
        );

        // Product dont exist in autocomplete error handling
        conceptos.valueChanges.subscribe(
            items => {
                items.forEach((item, index) => {
                    let productExist = false;
                    this.products.forEach((product) => {
                        if (product.id === item.product.id) {
                            productExist = true;
                        }
                    });
                    if (!productExist) {
                        conceptos.at(index).get('product').setErrors({productDontExists: true});
                    } else {
                        conceptos.at(index).get('product').setErrors(null);
                    }
                });
            }
        );

        // Fill form from id of invoice
        this.route.params.subscribe(params => {
            const param: any = params;
            if (param.id) {
                this.id = param.id;
                this.facturaService.get(param.id).subscribe(
                    factura => {
                        this.facturaForm.get('customer').setValue(factura.customer);
                        this.facturaForm.get('payment_form').setValue(factura.payment_form);
                        // this.facturaForm.get('subtotal').setValue(factura.subtotal);
                        // this.facturaForm.get('iva').setValue(factura.iva);
                        // this.facturaForm.get('totalneto').setValue(factura.totalneto);

                        for (let a = 0; a < factura.items.length; a++) {
                            if (a !== 0) {
                                this.addConcepto();
                            }
                            conceptos.at(a).get('quantity').setValue(factura.conceptos[a].quantity);
                            conceptos.at(a).get('product').setValue(factura.conceptos[a].product);
                            // conceptos.at(a).get('importe').setValue(factura.conceptos[a].importe);
                        }
                    }
                );
            }
        });
    }

    displayProduct(product): string {
        return product ? product.description : '';
    }

    displayClient(client): string {
        return client ? client.legal_name : '';
    }

    // Filter funcions
    filterClientes(val: string): string[] {
        return this.clients.filter(option =>
            option.legal_name.toLowerCase().includes((val as any).legal_name.toLowerCase())
            || option.legal_name.toLowerCase().indexOf((val as any).legal_name.toLowerCase()) === 0
            || option.tax_id.toLowerCase().includes((val as any).legal_name.toLowerCase())
            || option.tax_id.toLowerCase().indexOf((val as any).legal_name.toLowerCase()) === 0);
    }

    filterProductos(val: string): string[] {
        return this.products.filter(option =>
            option.description.toLowerCase().includes((val as any).description.toLowerCase())
            || option.description.toLowerCase().indexOf((val as any).description.toLowerCase()) === 0);
    }

    // Getters from services
    getClients() {
        this.clientService.getAll().subscribe(data => {
            this.clients = data;
        });
    }

    getProducts() {
        this.productService.getAll().subscribe(data => {
            this.products = data;
        });
    }

    // Watcher for device size
    onResize(event) {
        if (event.target.innerWidth < 992) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }

        if (event.target.innerWidth < 767) {
            this.isExtraSmall = true;
        } else {
            this.isExtraSmall = false;
        }
    }

    // Dialog Openers
    openAddClientDialog(): void {
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

    openAddProductDialog(): void {
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

    // Create item
    addConcepto(): void {
        const conceptos: FormArray = this.facturaForm.get('items') as FormArray;
        conceptos.push(new FormGroup({
            quantity: new FormControl(),
            product: new FormControl(),
            importe: new FormControl()
        }));

        this.filteredProducts.push(conceptos.at(conceptos.length - 1).get('product').valueChanges
            .startWith(null)
            .map(val => val ? this.filterProductos(val) : this.products.slice()));
    }

    // remove item
    removeConcepto(index): void {
        const conceptos: FormArray = this.facturaForm.get('items') as FormArray;
        conceptos.removeAt(index);
        this.filteredProducts.splice(index, 1);
    }

    // Set total, iva and total neto
    calcularImporte(index) {
        // Calcular importe
        const conceptos: FormArray = this.facturaForm.get('items') as FormArray;
        const cantidad = conceptos.at(index).get('quantity').value;
        let preciounitario = 0;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === conceptos.at(index).get('product').value.id) {
                preciounitario = this.products[i].price;
            }
        }
        conceptos.at(index).get('importe').setValue((cantidad * preciounitario));

        this.calcularTotales();
    }

    calcularTotales(): void {
        const conceptos: FormArray = this.facturaForm.get('items') as FormArray;
        let subtotal = 0;
        let iva = 0;
        let totalneto = 0;
        conceptos.controls.forEach((concepto) => {
            subtotal += concepto.get('importe').value;
        });
        iva = subtotal * 0.16;
        totalneto = subtotal + iva;
        this.facturaForm.get('subtotal').setValue(subtotal);
        this.facturaForm.get('iva').setValue(iva);
        this.facturaForm.get('totalneto').setValue(totalneto);
    }

    // submit invoice
    onSubmit(facturaForm) {
        console.log(facturaForm.value);
        // if (this.id) {
        //     this.facturaService.editFactura(facturaForm.value, this.id).subscribe(
        //         data => {
        //             this.notify.success('pe-7s-check', 'Factura editada correctamente');
        //         },
        //         err => {
        //             console.log(err);
        //             this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
        //         }
        //     );
        // } else {
        //     this.facturaService.addFactura(facturaForm.value).subscribe(
        //         data => {
        //             this.id = data._id;
        //             this.notify.success('pe-7s-check', 'Factura agregada correctamente');
        //         },
        //         err => {
        //             console.log(err);
        //             this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
        //         }
        //     );
        // }

    }

    // send to client email
    sendFactura() {
        this.facturaService.notify().subscribe(
            data => {
                this.notify.success('pe-7s-check', 'Factura enviada correctamente');
            },
            error => {
                this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
            }
        );
    }
}
