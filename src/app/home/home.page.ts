import { Component } from '@angular/core';
import { ApiService } from './../api.service';
import { AlertController } from '@ionic/angular';
import { title } from 'process';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  peliculas : any;
  items : any;
  
  constructor( public api : ApiService, public alert : AlertController) {
   } 
  ngOnInit() {
    this.DatosPelicula();
  }

  async DatosPelicula() {
    await this.api.DatosPelicula()
      .subscribe(
        res => {
          console.log(res);
          this.peliculas = res.results;
          console.log(this.peliculas);
        }, err => {
          console.log(err);
        }
      );
  }



  initializeItems() {
    this.items = this.peliculas;
  }
  getItems(ev : any) {
    this.initializeItems();
    let val = ev.target.value;
    if(val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async verInformacion(id, title, overview, original_language, release_date, vote_average) {
    let vpeliculas = this.peliculas.filter(function(e,id,title,overview) { return e.id == id, e.title == title, e.overview == overview, 
      e.original_language == original_language, e.release_date == release_date, e.vote_average == vote_average}) [0];
    let alerta = await this.alert.create({
        header: 'Detalles de ' + title,
        message: 'Idioma: '  +  original_language + '<br>'
         + 'Fecha: ' + release_date + '<br>'
         + 'Valoración: ' + vote_average + '<br>' +
         'Descripción: ' + overview,
        buttons: ['OK']
    });
    await alerta.present();
  }

}
