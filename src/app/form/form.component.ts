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
import {ProductService} from '../utils/services/product.service';
import {ProductDialogComponent} from '../dialogs/product-dialog/product-dialog.component';
import {conf} from '../utils/conf';

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
        use: new FormControl(),
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
    formasdepago = conf.formasdepago;
    usos = conf.usos;

    constructor(public dialog: MatDialog,
                private notify: NotifyService,
                private clientService: ClientService,
                private productService: ProductService,
                private facturaService: FacturaService) {
    }

    ngOnInit() {
        this.getClients();
        this.getProducts();

        this.filteredClients = this.facturaForm.get('customer').valueChanges
            .startWith(null)
            .map(client => client && typeof client === 'object' ? client.legal_name : client)
            .map(val => val ? this.filterClientes(val) : this.clients.slice());

        const conceptos: FormArray = this.facturaForm.get('items') as FormArray;
        this.filteredProducts = [
            conceptos.at(0).get('product').valueChanges
                .startWith(null)
                .map(product => product && typeof product === 'object' ? product.description : product)
                .map(val => val ? this.filterProductos(val) : this.products.slice())
        ];

        // Client dont exist in autocomplete error handling
        this.facturaForm.get('customer').valueChanges.subscribe(
            customer => {
                for (const client of this.clients) {
                    if (client.id !== customer.id) {
                        this.facturaForm.get('customer').setErrors({clientDontExists: true});
                    } else {
                        this.facturaForm.get('customer').setErrors(null);
                        break;
                    }
                }
            }
        );

        // Product dont exist in autocomplete error handling
        conceptos.valueChanges.subscribe(
            items => {
                items.forEach((item, index) => {
                    if (item.product !== null) {
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
                    }
                });
            }
        );
    }

    displayProduct(product): string {
        return product ? product.description : '';
    }

    displayClient(client): string {
        return client ? client.legal_name : '';
    }

    // Filter funcions
    filterClientes(val: string): string[] {
        return this.clients.filter(option => option.legal_name.toLowerCase().includes(val.toLowerCase())
            || option.legal_name.toLowerCase().indexOf(val.toLowerCase()) === 0
            || option.tax_id.toLowerCase().includes(val.toLowerCase())
            || option.tax_id.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    filterProductos(val: string): string[] {
        return this.products.filter(option =>
            option.description.toLowerCase().includes(val.toLowerCase())
            || option.description.toLowerCase().indexOf(val.toLowerCase()) === 0);
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

        this.filteredProducts.push(conceptos.at(0).get('product').valueChanges
            .startWith(null)
            .map(product => product && typeof product === 'object' ? product.description : product)
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
        if (conceptos.at(index).get('product').value) {
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === conceptos.at(index).get('product').value.id) {
                    preciounitario = this.products[i].price;
                    if (!this.products[i].tax_included) {
                        // El producto no contiene IVA y hay que calcularlo
                        preciounitario = this.products[i].price + (this.products[i].price * 0.16);
                    }
                }
            }
        }
        conceptos.at(index).get('importe').setValue((cantidad * preciounitario));

        this.calcularTotales();
    }

    calcularTotales(): void {
        const conceptos: FormArray = this.facturaForm.get('items') as FormArray;
        let subtotal;
        let iva;
        let totalneto = 0;
        conceptos.controls.forEach((concepto) => {
            totalneto += concepto.get('importe').value;
        });
        subtotal = totalneto / 1.16;
        iva = subtotal * 0.16;
        this.facturaForm.get('subtotal').setValue(subtotal);
        this.facturaForm.get('iva').setValue(iva);
        this.facturaForm.get('totalneto').setValue(totalneto);
    }

    // submit invoice
    onSubmit(facturaForm) {
        const factura = facturaForm.value;
        factura.customer = factura.customer.id;
        factura.items.forEach((item) => {
            delete item.importe;
            item.product = item.product.id;
        });
        delete factura.iva;
        delete factura.subtotal;
        delete factura.totalneto;

        this.facturaService.addFactura(factura).subscribe(
            data => {
                const dat: any = data;
                this.id = dat.id;
                this.notify.success('pe-7s-check', 'Factura agregada correctamente');
            },
            err => {
                console.log(err);
                this.notify.error('pe-7s-close-circle', `Error. ${err}`);
            }
        );
    }

    // send to client email
    sendFactura() {
        this.facturaService.send(this.id).subscribe(
            data => {
                this.notify.success('pe-7s-check', 'Factura enviada al cliente correctamente');
            },
            error => {
                this.notify.error('pe-7s-close-circle', `Error. ${err}`);
            }
        );
    }
}
