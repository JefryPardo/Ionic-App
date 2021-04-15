import { ListaItem } from './lista-item.model';

export class Lista{

    id: number;
    titulo: string;
    creada: Date;
    terminada: Date;
    completada: boolean;
    items: ListaItem[];

    constructor( _titulo: string ){
        
        this.titulo = _titulo;
        this.creada = new Date();
        this.completada = false;
        this.items = [];
        this.id = new Date().getTime();

    }
}