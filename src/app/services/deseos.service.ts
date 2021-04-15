import { Injectable } from '@angular/core';
import { Lista } from '../pages/models/lista.model';


@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() { 
    this.cargarStorage();
  }

  crearLista( titulo: string){
    const NuevaLista = new Lista(titulo);
    this.listas.push( NuevaLista );
    this.guardarStorage();
    return NuevaLista.id;
  }

  obtenerLista( id: string | number ){
    id = Number(id);
    return this.listas.find( listaData =>{ return listaData.id === id; });
    
  }


  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));    
  }

  cargarStorage(){
    if(localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    }else{
      this.listas = [];
    }
  }

  borrarLista( item: Lista ){
    console.log('entro',item.id);
    this.listas = this.listas.filter( resultado => { return resultado.id !== item.id}) 
    console.log(this.listas);
    this.guardarStorage();
  }

  

}
