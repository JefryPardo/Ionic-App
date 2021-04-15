import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../models/lista.model';
import { ListaItem } from '../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor( private deseosS:DeseosService, private route: ActivatedRoute) { 
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosS.obtenerLista( listaId);
  }

  agregarItem(){
    if( this.nombreItem.length === 0){
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push( nuevoItem );
    this.nombreItem = '';
    this.deseosS.guardarStorage();
  }

  cambioCheck( item: ListaItem ){
    const pendientes = this.lista.items.filter( itemData => { return ! itemData.completado } ).length;
    
    if(pendientes === 0 ){
      this.lista.terminada = new Date();
      this.lista.completada = true;
    }else{
      this.lista.terminada = null;
      this.lista.completada = false;
    }
    
    this.deseosS.guardarStorage();
  }

  borrar(i: number ){
    this.lista.items.splice( i, 1 );
    this.deseosS.guardarStorage();
  }

  ngOnInit() {
  }

}
