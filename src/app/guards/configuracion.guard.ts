import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/Operators";
import { ConfiguracionService } from "../services/configuracion.service";

@Injectable()
export class ConfiguracionGuard implements CanActivate{
    constructor(private router: Router,
                private configuracionService: ConfiguracionService){}

    canActivate(): Observable<boolean>{
        return this.configuracionService.getConfiguracion().pipe(
            map( configuracion => {
                if( configuracion.permitirRegistro ){
                    return true;
                }
                else{
                    this.router.navigate(['login']);
                    return false;
                }
            })
        )
    }
}