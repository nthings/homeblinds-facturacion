// Dependencies
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
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
import {FooterModule} from './shared/footer/footer.module';
import {SidebarModule} from './sidebar/sidebar.module';
import {LbdModule} from './lbd/lbd.module';

// Components
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {ModPasswordComponent} from './mod-password/mod-password.component';
import {LoginComponent} from './login/login.component';
import {FormComponent} from './form/form.component';
import { FacturasComponent } from './facturas/facturas.component';

// Pipes
import {SafeHtml} from './utils/pipes/safeHtml';
import {SearchPipe} from './utils/pipes/search.pipe';

// Dialogs
import {UserDialogComponent} from './dialogs/user-dialog/user-dialog.component';
import {DeleteDialogComponent} from './dialogs/delete-dialog/delete-dialog.component';
import {ClientDialogComponent} from './dialogs/client-dialog/client-dialog.component';
import {RolesDialogComponent} from './dialogs/roles-dialog/roles-dialog.component';
import {ConceptosDialogComponent} from './dialogs/conceptos-dialog/conceptos-dialog.component';


// Services
import {ClientService} from './utils/services/client.service';
import {RoleService} from './utils/services/role.service';
import {UserService} from './utils/services/user.service';
import {NotifyService} from './utils/services/notify.service';
import {AuthGuard} from './utils/guards/auth.guard';
import {AuthenticationService} from './utils/services/authentication.service';
import {FacturaService} from './utils/services/factura.service';

@NgModule({
    declarations: [
        AppComponent,
        ModPasswordComponent,
        UsersComponent,
        SafeHtml,
        SearchPipe,
        UserDialogComponent,
        ModPasswordComponent,
        DeleteDialogComponent,
        ClientDialogComponent,
        RolesDialogComponent,
        ConceptosDialogComponent,
        LoginComponent,
        FormComponent,
        FacturasComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        RouterModule,
        AppRoutingModule,
        LbdModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule
    ],
    providers: [
        AuthGuard,
        ClientService,
        RoleService,
        AuthenticationService,
        UserService,
        FacturaService,
        NotifyService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        UserDialogComponent,
        DeleteDialogComponent,
        RolesDialogComponent,
        ClientDialogComponent,
        ConceptosDialogComponent
    ]
})
export class AppModule {
}
