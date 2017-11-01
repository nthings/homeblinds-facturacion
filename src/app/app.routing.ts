import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {ModPasswordComponent} from './mod-password/mod-password.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './utils/guards/auth.guard';
import {FormComponent} from './form/form.component';
import {FacturasComponent} from './facturas/facturas.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'factura', canActivate: [AuthGuard], component: FormComponent},
    {path: 'facturas-existentes', canActivate: [AuthGuard], component: FacturasComponent},
    // {path: 'usuarios', canActivate: [AuthGuard, NewUserGuard], component: UsersComponent},
    // {path: 'usuario', canActivate: [AuthGuard, NewUserGuard], component: UserComponent},
    {path: 'mod-pass', canActivate: [AuthGuard], component: ModPasswordComponent},
    // {path: 'roles', canActivate: [AuthGuard, NewUserGuard], component: RolesComponent},
    // {path: 'department', canActivate: [AuthGuard, NewUserGuard], component: DepartmentComponent},
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    {path: '', redirectTo: 'login', pathMatch: 'full'}
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
