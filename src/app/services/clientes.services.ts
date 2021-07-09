import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Cliente } from "../models/clientes.model";
import { map } from 'rxjs/Operators';

@Injectable()
export class ClienteService{
    clientesColeccion: AngularFirestoreCollection<Cliente>;
    clienteDoc: AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>;
    cliente: Observable<any>;

    constructor(private db: AngularFirestore){
        this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
    }

    getClientes(): Observable<Cliente[]>{
        //Metodo para obtener clientes
        this.clientes = this.clientesColeccion.snapshotChanges().pipe(
            map( cambios => {
                // De esta forma se accede a cada uno de los elementos de nuestra conexión
                return cambios.map(accion => {
                    const datos = accion.payload.doc.data() as Cliente;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.clientes;
    }

    agregarCliente(cliente: Cliente){
        this.clientesColeccion.add(cliente);
    }

    getCliente(id:string){
        this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
        this.cliente = this.clienteDoc.snapshotChanges().pipe(
            map( acction => {
                if(acction.payload.exists === false){
                  return null;  
                }
                else{
                    const datos = acction.payload.data() as Cliente;
                    datos.id = acction.payload.id;
                    return datos;
                }
            })
        );
        return this.cliente;
    }

    modificarCliente(cliente : Cliente){
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.update(cliente);
    }

    eliminarCliente(cliente: Cliente){
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.delete();
    }

}
