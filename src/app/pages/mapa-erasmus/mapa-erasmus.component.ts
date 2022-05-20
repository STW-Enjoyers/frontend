// Documentation, https://github.com/Asymmetrik/ngx-leaflet
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as MapaErasmusConstants from './mapa-erasmus.constants'
import {ErasmusService} from "../../services/erasmus.service";
import {Erasmus} from "../../models/Erasmus";
@Component({
  selector: 'app-mapa-erasmus',
  templateUrl: './mapa-erasmus.component.html',
  styleUrls: ['./mapa-erasmus.component.css']
})
export class MapaErasmusComponent implements OnInit {
  // Constants
  title = MapaErasmusConstants.TITLE
  legendTitle = MapaErasmusConstants.LEGEND_TITLE
  legendErasmusIn = MapaErasmusConstants.LEGEND_ERASMUS_IN
  legendErasmusOut = MapaErasmusConstants.LEGEND_ERASMUS_OUT
  colorErasmusIn = MapaErasmusConstants.COLOR_ERASMUS_IN
  colorErasmusOut = MapaErasmusConstants.COLOR_ERASMUS_OUT
  maxCircleSize = MapaErasmusConstants.MAX_CIRCLE_SIZE
  minCircleSize = MapaErasmusConstants.MIN_CIRCLE_SIZE

  erasmusList!:Erasmus[]
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        maxZoom: 12, 
        minZoom: 4,
        attribution: '...' 
      }),
    ],
    zoom: 4,
    center: L.latLng(48.0, 7.0)
  };

  layers:L.Layer[] = [];

  constructor(private erasmusService: ErasmusService) { }

  ngOnInit(): void {
    this.getErasmusOut()
    this.getErasmusIn()
  }

  onMapReady(map: L.Map) {
    let legend = new L.Control({ position: "bottomright" });
    legend.onAdd = this.addLegend
    legend.addTo(map)
  }

  addLegend(map: L.Map) {
    var div = L.DomUtil.get("leyenda") ?? L.DomUtil.create("div");

    return div;
  }

  // Erasmus from Unizar to other foreign countries
  getErasmusOut() {
    this.erasmusService.getErasmusOut().subscribe(
      (res: any) => {
        this.erasmusList = res
        this.erasmusList.forEach(erasmus => {
          this.addCircle(erasmus, this.maxCircleSize, this.minCircleSize, this.colorErasmusOut)
        })})
  }

  // Erasmus from other foreign countries to Unizar
  getErasmusIn() {
    this.erasmusService.getErasmusIn().subscribe(
      (res: any) => {
        let erasmus = res
        this.addCircle(erasmus, this.maxCircleSize, this.minCircleSize, this.colorErasmusIn)
      })
  }

  //Add a circle layer
  addCircle(erasmus: Erasmus, maxSize:number, minSize:number, color:string) {
    var circle = L.circleMarker([erasmus.lat, erasmus.lng], {
      radius:  this.scaledRadius(erasmus.plazas, maxSize, minSize), color: color
    })
    // Add circle tooltip
    circle.bindPopup("<b>País: </b>" + erasmus.pais + "<br>" + "<b>Plazas: </b>" + erasmus.plazas, {closeButton:false})
    this.layers.push( circle )
  }

  scaledRadius(val:number, maxVal:number, minVal:number) {
    let multiplier = 40
    if (val > maxVal) return multiplier + minVal
    return multiplier * (val / maxVal) + minVal;
  }

}

