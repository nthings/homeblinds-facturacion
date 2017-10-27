import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AuthenticationService} from "../../utils/services/authentication.service";

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

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
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    menuItems: any[];
    private optionSelected;

    @Input()
    user;

    constructor(location: Location,
                private element: ElementRef,
                private router: Router,
                private auth: AuthenticationService) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES_NAV_BAR.filter(listTitle => listTitle);
        this.listTitles.push({path: 'usuarios', title: 'Usuarios'});
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        this.menuItems = ROUTES_NAV_BAR.filter(menuItem => menuItem);

        console.log(this.listTitles);
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    }

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.split('/').pop();
        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return this.optionSelected;
        // return 'Usuarios';
    }

    logout() {
        this.auth.logout();
    }
}
