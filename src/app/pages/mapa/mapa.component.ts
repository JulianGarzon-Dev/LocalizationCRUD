import { Component, OnInit } from '@angular/core';
import { TareaModel } from '../../models/tarea.model';
import { TareasService } from '../../services/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {

  @ViewChild(GoogleMap) map: GoogleMap
  @ViewChild(MapInfoWindow) info: MapInfoWindow

  tarea: TareaModel = new TareaModel();
  zoom = 15;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
  };
  markers = [];
  infoContent = '';

  constructor(private tareasService: TareasService,
    private route: ActivatedRoute) { }

  ngOnInit() {


    debugger
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {

      this.tareasService.getTarea(id)
        .subscribe((resp: TareaModel) => {
          this.tarea = resp;
          this.getcoordenadas();
          this.addMarker();
        });

    }
  }
  getcoordenadas() {
    var latitud = Number(this.tarea.latitud);
    var longitud = Number(this.tarea.longitud);
    this.center = { lat: latitud, lng: longitud };
    
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  };

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  addMarker() {
    var nombre = String(this.tarea.nombre);
    this.markers.push({
      
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      label: {
        color: 'red',
        text: nombre,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })
  };

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  };

  }
