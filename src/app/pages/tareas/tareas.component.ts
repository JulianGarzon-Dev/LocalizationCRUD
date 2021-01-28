import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { TareaModel } from '../../models/tarea.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas: TareaModel[] = [];
  cargando = false;


  constructor( private tareasService: TareasService ) { }

  ngOnInit() {

    this.cargando = true;
    this.tareasService.getTareas()
      .subscribe( resp => {
        this.tareas = resp;
        this.cargando = false;
      });

  }

  borrarTarea( tarea: TareaModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ tarea.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.tareas.splice(i, 1);
        this.tareasService.borrarTarea( tarea.id ).subscribe();
      }

    });



  }


}
