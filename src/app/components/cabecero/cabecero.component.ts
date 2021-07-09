import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { LoginServices } from 'src/app/services/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: any;
  permitirRegistro: boolean;

  constructor(private loginServices: LoginServices,
              private router:Router,
              private configuracionService: ConfiguracionService) { }

  ngOnInit(){
    this.loginServices.getAuth().subscribe(
      auth => {
        if(auth){
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        }
        else{
          this.isLoggedIn = false;
        }
      });
      this.configuracionService.getConfiguracion().subscribe(
        configuracion => {
          this.permitirRegistro = Boolean(configuracion.permitirRegistro);
        }
      )
  }

  logout(){
    this.loginServices.logout();
    this.isLoggedIn = false;
    this.router.navigate(["/login"]);
  }

}
