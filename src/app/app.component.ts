import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./utils/services/authentication.service";
import {Router} from "@angular/router";
import {LoadingService} from "./utils/services/loading.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
    standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loading$: Observable<boolean>;

     constructor(private auth: AuthenticationService,
                 private router: Router,
                 private loadingService: LoadingService) {
        this.loading$ = this.loadingService.loading$;
     }
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
