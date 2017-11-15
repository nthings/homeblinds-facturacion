import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../utils/services/authentication.service';

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
    // { path: 'clientes', title: 'Clientes',  icon: 'pe-7s-users', class: '' }
];

export const ROUTES_NAV_BAR: RouteInfo[] = [
    {path: 'mod-pass', title: 'Cambiar Password', icon: 'pe-7s-key', class: 'icon'},
    {path: '', title: '', icon: '', class: 'divider'},
    {path: 'logout', title: 'Cerrar Sesion', icon: 'pe-7s-door-lock', class: 'icon'}
    // { path: 'table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    // { path: 'typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    // { path: 'icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    // { path: 'maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    // { path: 'notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    menuItemsDrop: any[];
    user;
    constructor(private auth: AuthenticationService) {
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
}
