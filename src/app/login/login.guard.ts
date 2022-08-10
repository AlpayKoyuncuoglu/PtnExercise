import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginComponent } from "./login.component";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private LoginComponent: LoginComponent, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        debugger;
        //let logged = this.LoginComponent.isLoggedIn();
        // let logged = this.LoginComponent.loggedIn();
        let islogged = localStorage.getItem("tkn")
        let islogged2 = sessionStorage.getItem("tkn");
        //let islogged=sessionStorage.getItem("tkn")
        debugger;
        if (islogged != null || islogged2 != null) {
            return true;
        }
        this.router.navigate(["login"]);
        return false;
    }
}