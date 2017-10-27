import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    facturaForm: FormGroup = new FormGroup({
        rfc: new FormControl(),
        razonsocial: new FormControl(),
        formadepago: new FormControl(),
    });

    constructor() {
    }

    ngOnInit() {
    }

}
