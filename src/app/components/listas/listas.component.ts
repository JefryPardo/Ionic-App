import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Lista } from '../../pages/models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild( IonList) lista: IonList;
  @Input() terminada = true;
  constructor(public deseosService: DeseosService, private router: Router,private alertCtrl: AlertController) { }

  ngOnInit() {}


  listaSeleccionada( item:Lista ){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ item.id }`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ item.id }`);
    }
  }

  borrarLista( item: Lista ){
    this.deseosService.borrarLista( item );
  }




  async editarLista( item: Lista ){
    //this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: item.titulo 
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Guardar',
          handler: ( data )=>{
            console.log(data);
            if(data.titulo.length === 0){
              return;
            }
            item.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();

  }

}
