import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { TareaModel } from '../../models/tarea.model';
import { TareasService } from '../../services/tareas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  tarea: TareaModel = new TareaModel();


  constructor( private tareasService: TareasService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.tareasService.getTarea( id )
        .subscribe( (resp: TareaModel) => {
          this.tarea = resp;
          this.tarea.id = id;
        });

    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if ( this.tarea.id ) {
      peticion = this.tareasService.actualizarTarea( this.tarea );
    } else {
      peticion = this.tareasService.crearTarea( this.tarea );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.tarea.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });



  }

}
