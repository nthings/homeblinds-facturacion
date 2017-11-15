import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {ModPasswordComponent} from './mod-password/mod-password.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './utils/guards/auth.guard';
import {FormComponent} from './form/form.component';
import {FacturasComponent} from './facturas/facturas.component';
import {ClientesComponent} from './clientes/clientes.component';
import {ProductosComponent} from './productos/productos.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'factura', canActivate: [AuthGuard], component: FormComponent},
    {path: 'facturas-existentes', canActivate: [AuthGuard], component: FacturasComponent},
    {path: 'clientes', canActivate: [AuthGuard], component: ClientesComponent},
    {path: 'productos', canActivate: [AuthGuard], component: ProductosComponent},
    // {path: 'usuarios', canActivate: [AuthGuard, NewUserGuard], component: UsersComponent},
    // {path: 'usuario', canActivate: [AuthGuard, NewUserGuard], component: UserComponent},
    {path: 'mod-pass', canActivate: [AuthGuard], component: ModPasswordComponent},
    {path: '', redirectTo: 'factura', pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
