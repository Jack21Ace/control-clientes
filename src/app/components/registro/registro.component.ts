import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginServices } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email:string;
  password:string;

  constructor(private router: Router,
              private flashMessages: FlashMessagesService,
              private loginServices: LoginServices) { }

  ngOnInit(): void {
    this.loginServices.getAuth().subscribe( auth => {
      if(auth){
        this.router.navigate(['/'])
      }
    })
  }

  registro(){
    this.loginServices.registrarse(this.email, this.password)
    .then( res => {
      this.router.navigate(['/']);
    })
    .catch( error => {
      this.flashMessages.show( error.message, {
        cssClass: "alert-danger", timeout: 5000
      });
    });
  }

}
