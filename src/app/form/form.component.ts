import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    facturaForm: FormGroup = new FormGroup({
        cliente: new FormControl(),
        // rfc: new FormControl(),
        // razonsocial: new FormControl(),
        // email: new FormControl(),
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

    constructor() {
    }

    ngOnInit() {
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
}
