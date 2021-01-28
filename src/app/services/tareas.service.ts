import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TareaModel } from '../models/tarea.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private url = 'YOUR DATA BASE';


  constructor( private http: HttpClient ) { }


  crearTarea( tarea: TareaModel ) {

    return this.http.post(`${ this.url }/tareas.json`, tarea)
            .pipe(
              map( (resp: any) => {
                tarea.id = resp.name;
                return tarea;
              })
            );

  }

  actualizarTarea( tarea: TareaModel ) {

    const tareaTemp = {
      ...tarea
    };

    delete tareaTemp.id;

    return this.http.put(`${ this.url }/tareas/${ tarea.id }.json`, tareaTemp);


  }

  borrarTarea( id: string ) {

    return this.http.delete(`${ this.url }/tareas/${ id }.json`);

  }


  getTarea( id: string ) {

    return this.http.get(`${ this.url }/tareas/${ id }.json`);

  }


  getTareas() {
    return this.http.get(`${ this.url }/tareas.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( tareasObj: object ) {

    const tareas: TareaModel[] = [];

    Object.keys( tareasObj ).forEach( key => {

      const tarea: TareaModel = tareasObj[key];
      tarea.id = key;

      tareas.push( tarea );
    });


    return tareas;

  }


}
