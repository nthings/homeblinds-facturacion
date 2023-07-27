// Dependencies
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import {RouterModule} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule
} from '@angular/material';
import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {SidebarModule} from './sidebar/sidebar.module';

// Components
import {AppComponent} from './app.component';
import {ModPasswordComponent} from './mod-password/mod-password.component';
import {LoginComponent} from './login/login.component';
import {FormComponent} from './form/form.component';
import { FacturasComponent } from './facturas/facturas.component';
import { ProductosComponent } from './productos/productos.component';

// Pipes
import {SearchPipe} from './utils/pipes/search.pipe';
import {PaymentFormPipe} from './utils/pipes/formadepago.pipe';
import {ProductTypePipe} from './utils/pipes/product-type.pipe';
import {UnityPipe} from './utils/pipes/unity.pipe';

// Dialogs
import {DeleteDialogComponent} from './dialogs/delete-dialog/delete-dialog.component';
import {ClientDialogComponent} from './dialogs/client-dialog/client-dialog.component';
import {ConceptosDialogComponent} from './dialogs/conceptos-dialog/conceptos-dialog.component';
import {ProductDialogComponent} from './dialogs/product-dialog/product-dialog.component';
import {CancelarFacturaDialogComponent} from './dialogs/cancelar-factura-dialog/cancelar-factura-dialog.component';

// Services
import {ClientService} from './utils/services/client.service';
import {UserService} from './utils/services/user.service';
import {NotifyService} from './utils/services/notify.service';
import {AuthGuard} from './utils/guards/auth.guard';
import {AuthenticationService} from './utils/services/authentication.service';
import {FacturaService} from './utils/services/factura.service';
import { ClientesComponent } from './clientes/clientes.component';
import {ProductService} from './utils/services/product.service';

//Interceptors
import {EmptyResponseBodyErrorInterceptor} from './utils/interceptors/empty-response-body-error.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        ModPasswordComponent,
        SearchPipe,
        PaymentFormPipe,
        ProductTypePipe,
        UnityPipe,
        ModPasswordComponent,
        DeleteDialogComponent,
        CancelarFacturaDialogComponent,
        ClientDialogComponent,
        ConceptosDialogComponent,
        ProductDialogComponent,
        LoginComponent,
        FormComponent,
        FacturasComponent,
        ClientesComponent,
        ProductosComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NavbarModule,
        SidebarModule,
        RouterModule,
        AppRoutingModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule,
        NgHttpLoaderModule
    ],
    providers: [
        AuthGuard,
        ClientService,
        AuthenticationService,
        UserService,
        FacturaService,
        ProductService,
        NotifyService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: EmptyResponseBodyErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DeleteDialogComponent,
        ClientDialogComponent,
        ConceptosDialogComponent,
        ProductDialogComponent,
        CancelarFacturaDialogComponent,
    ]
})
export class AppModule {
}
