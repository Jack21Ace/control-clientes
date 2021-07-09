import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'rxjs/Operators';
import { Cliente } from 'src/app/models/clientes.model';
import { ClienteService } from 'src/app/services/clientes.services';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente ={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }
  //, {static: false}
  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private clientesServicio: ClienteService,
              private flashMessages: FlashMessagesService ) {}

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach(cliente => {
        saldoTotal += Number(cliente.saldo);
      })
    }
    return saldoTotal;
  }

  agregar(f:NgForm){
    if(!f.valid){
      this.flashMessages.show("Por favor llena el formulario correctamente", {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      // en caso de que el formulario sea valido,  agregar al nuevo cliente 
      this.clientesServicio.agregarCliente(f.value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
