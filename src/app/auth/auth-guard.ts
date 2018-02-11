import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private cookieService: CookieService, private router: Router){}

    canActivate () : boolean {
        let cookie = this.cookieService.get('User');
        //console.log(cookie);
        if(cookie.length > 0){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}