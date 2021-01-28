import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasComponent } from './pages/tareas/tareas.component';
import { TareaComponent } from './pages/tarea/tarea.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { MapaComponent } from './pages/mapa/mapa.component';

const routes: Routes = [
  { path: 'galeria', component: GaleriaComponent },
  { path: 'tareas', component: TareasComponent },
  { path: 'tarea/:id', component: TareaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'mapa/:id', component: MapaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'galeria' }
];



@NgModule({
  imports: [
    RouterModule.forRoot( routes, {useHash: true} )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
