export class ListaItem{
    desc: string;
    completado: boolean;

    constructor( _desc: string) {
        this.desc = _desc;
        this.completado = false; 
    }
}