import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../utils/services/authentication.service';
import {NotifyService} from '../utils/services/notify.service';
import {Router} from '@angular/router';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: 'factura', title: 'Nueva Factura', icon: 'pe-7s-portfolio', class: ''},
    {path: 'facturas-existentes', title: 'Facturas', icon: 'pe-7s-box1', class: ''},
    {path: 'clientes', title: 'Clientes', icon: 'pe-7s-users', class: ''},
    {path: 'productos', title: 'Productos', icon: 'pe-7s-box2', class: ''}
];

export const ROUTES_NAV_BAR: RouteInfo[] = [
    {path: 'mod-pass', title: 'Cambiar Password', icon: 'pe-7s-key', class: 'icon'},
    {path: '', title: '', icon: '', class: 'divider'},
    {path: 'logout', title: 'Cerrar Sesion', icon: 'pe-7s-door-lock', class: 'icon'}
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    menuItemsDrop: any[];
    user;
    users = [
        {
            id: 1,
            name: 'MAURICIO ALEJANDRO MARTINEZ PACHECO'
        },
        {
            id: 2,
            name: 'BEATRIZ MARGARITA PACHECO RODRIGUEZ'
        }
    ];
    selected = 0;

    constructor(private notify: NotifyService,
                private auth: AuthenticationService,
                private router: Router) {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.menuItemsDrop = ROUTES_NAV_BAR.filter(menuItem => menuItem);
        this.user = this.auth.user;
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    useBy(select) {
        this.auth.useBy(select).subscribe(
            changed => {
                this.selected = (select - 1);
                this.notify.success('pe-7s-check', 'EMISOR CAMBIADO');
                this.router.navigate(['/']);
            },
            error => {
                console.log(error);
                this.notify.error('pe-7s-close-circle', 'Error de sistema. Verificar con el administrador.');
            }
        );
    }
}
