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
        cliente: new FormControl(),
        formadepago: new FormControl(),
        conceptos: new FormArray([
            new FormGroup({
                cantidad: new FormControl(),
                unidad: new FormControl(),
                descripcion: new FormControl(),
                valorunitario: new FormControl(),
                importe: new FormControl(),
            })
        ]),
        subtotal: new FormControl(),
        iva: new FormControl(),
        totalneto: new FormControl(),
    });

    clients: any = [];
    filteredClients: Observable<string[]>;
    formasdepago = [
        'Efectivo',
        'Cheque nominativo',
        'Transferencia electrónica de fondos',
        'Tarjeta de crédito',
        'Monedero electrónico',
        'Dinero electrónico',
        'Vales de despensa',
        'Dación en pago',
        'Pago por subrogación',
        'Pago por consignación',
        'Condonación',
        'Compensación',
        'Novación',
        'Confusión',
        'Remisión de deuda',
        'Prescripción o caducidad',
        'A satisfacción del acreedor',
        'Tarjeta de débito',
        'Tarjeta de servicios',
        'Por definir'
    ];

    unidades = [
        'PIEZAS',
        'METROS CUADRADOS',
        'METROS LINEALES'
    ];

    constructor(public dialog: MatDialog,
                private notify: NotifyService,
                private clientService: ClientService,
                private facturaService: FacturaService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getClients();

        this.filteredClients = this.facturaForm.get('cliente').valueChanges
            .startWith(null)
            .map(val => val ? this.filter(val) : this.clients.slice());

        this.facturaForm.get('cliente').valueChanges.subscribe(
            rfc => {
                this.clients.forEach((client) => {
                    if (client.rfc !== rfc) {
                        this.facturaForm.get('cliente').setErrors({clientDontExists: true});
                    } else {
                        this.facturaForm.get('cliente').setErrors(null);
                    }
                });
            }
        );

        this.route.params.subscribe(params => {
            const param: any = params;
            if (param.id) {
                this.id = param.id;
                this.facturaService.get(param.id).subscribe(
                    factura => {
                        if (typeof(factura.cliente) === 'string') {
                            this.facturaForm.get('cliente').setValue(factura.cliente);
                        } else {
                            this.facturaForm.get('cliente').setValue(factura.cliente.rfc);
                        }
                        this.facturaForm.get('formadepago').setValue(factura.formadepago);
                        this.facturaForm.get('subtotal').setValue(factura.subtotal);
                        this.facturaForm.get('iva').setValue(factura.iva);
                        this.facturaForm.get('totalneto').setValue(factura.totalneto);

                        const conceptos: FormArray = this.facturaForm.get('conceptos') as FormArray;
                        for (let a = 0; a < factura.conceptos.length; a++) {
                            if (a !== 0) {
                                this.addConcepto();
                            }
                            conceptos.at(a).get('cantidad').setValue(factura.conceptos[a].cantidad);
                            conceptos.at(a).get('unidad').setValue(factura.conceptos[a].unidad);
                            conceptos.at(a).get('descripcion').setValue(factura.conceptos[a].descripcion);
                            conceptos.at(a).get('valorunitario').setValue(factura.conceptos[a].valorunitario);
                            conceptos.at(a).get('importe').setValue(factura.conceptos[a].importe);
                        }
                    }
                );
            }
        });
    }

    filter(val: string): string[] {
        return this.clients.filter(option =>
            option.razonsocial.toLowerCase().includes(val.toLowerCase())
            || option.razonsocial.toLowerCase().indexOf(val.toLowerCase()) === 0
            || option.rfc.toLowerCase().includes(val.toLowerCase())
            || option.rfc.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    getClients() {
        this.clientService.getAll().subscribe(data => {
            this.clients = data;
        });
    }

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

    calcularImporte(i): void {
        const conceptos: FormArray = this.facturaForm.get('conceptos') as FormArray;
        const cantidad = conceptos.controls[i].get('cantidad').value || 1;
        const preciounitario = conceptos.controls[i].get('valorunitario').value || 1;
        const importe = conceptos.controls[i].get('importe');
        importe.setValue(cantidad * preciounitario);

        this.calcularTotales();
    }

    addConcepto(): void {
        const conceptos: FormArray = this.facturaForm.get('conceptos') as FormArray;
        conceptos.push(new FormGroup({
            cantidad: new FormControl(),
            unidad: new FormControl(),
            descripcion: new FormControl(),
            valorunitario: new FormControl(),
            importe: new FormControl(),
        }));
    }

    removeConcepto(index): void {
        const conceptos: FormArray = this.facturaForm.get('conceptos') as FormArray;
        conceptos.removeAt(index);
    }

    calcularTotales(): void {
        const conceptos: FormArray = this.facturaForm.get('conceptos') as FormArray;
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

    onSubmit(facturaForm) {
        if (this.id) {
            this.facturaService.editFactura(facturaForm.value, this.id).subscribe(
                data => {
                    this.notify.success('pe-7s-check', 'Factura editada correctamente');
                },
                err => {
                    console.log(err);
                    this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
                }
            );
        } else {
            this.facturaService.addFactura(facturaForm.value).subscribe(
                data => {
                    this.id = data._id;
                    this.notify.success('pe-7s-check', 'Factura agregada correctamente');
                },
                err => {
                    console.log(err);
                    this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
                }
            );
        }

    }

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
