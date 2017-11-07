import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./utils/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

     constructor(private auth: AuthenticationService,
                 private router: Router) {}
    user = {nombre: 'No haz iniciado sesión', logged: false};
    ngOnInit() {
        this.auth.loggedInEmitted$.subscribe(
            user => {
                this.user = user;
                this.user.nombre = (user.nombre.indexOf(' ') >= 0 ? user.nombre.substr(0, user.nombre.indexOf(' ')) : user.nombre);
            }
        );

        this.auth.loggedOutEmitted$.subscribe(
            user => {
                this.user = user;
                this.router.navigate(['/login']);
            }
        );
    }
}
