import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/Operators";

@Injectable()
export class LoginServices{
    constructor(private authService: AngularFireAuth){}

    //Para autenticar un usuario
    login(email:string, password:string){
        return new Promise((resolve, reject) => {
            this.authService.signInWithEmailAndPassword(email, password)
            .then(datos => resolve(datos),
            error => reject(error)
            )
        })
    }

    //Para recuperar el usuario autenticado
    getAuth(){
        return this.authService.authState.pipe(
            map( auth => auth)
        );
    }

    // Cerrar  sesion
    logout(){
        this.authService.signOut();
    }

    registrarse( email: string, password: string ){
        return new Promise((resolve, reject) => {
            this.authService.createUserWithEmailAndPassword(email, password)
            .then(datos => resolve(datos),
            error => reject(error))
        });
    }

}