import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginServices } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  login(){
    this.loginServices.login(this.email, this.password)
    .then( res => {
      this.router.navigate(['/']);
    })
    .catch( error => {
      this.flashMessages.show(error.message, {
        cssClass: 'alert-danger', timeout: 5000
      });
    });
  }

}
