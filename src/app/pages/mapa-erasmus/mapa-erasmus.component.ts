// Documentation, https://github.com/Asymmetrik/ngx-leaflet
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {ErasmusService} from "../../services/erasmus.service";
import {Erasmus} from "../../models/Erasmus";
@Component({
  selector: 'app-mapa-erasmus',
  templateUrl: './mapa-erasmus.component.html',
  styleUrls: ['./mapa-erasmus.component.css']
})
export class MapaErasmusComponent implements OnInit {
  erasmusList!:Erasmus[]
  maxCircleSize = 2000
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 15, attribution: '...' })
    ],
    zoom: 5,
    center: L.latLng(50.378472, 14.970598)
  };

  layers:L.Layer[] = [];

  constructor(private erasmusService: ErasmusService) { }

  ngOnInit(): void {
    this.getErasmusOut()
    this.getErasmusIn()
  }

  // Erasmus from Unizar to other foreign countries
  getErasmusOut() {
    this.erasmusService.getErasmusOut().subscribe(
      (res: any) => {
        this.erasmusList = res
        this.erasmusList.forEach(erasmus => {
          this.addCircle(erasmus, this.maxCircleSize)
        })})
  }

  // Erasmus from other foreign countries to Unizar
  getErasmusIn() {
    this.erasmusService.getErasmusIn().subscribe(
      (res: any) => {
        let erasmus = res
        this.addCircle(erasmus, this.maxCircleSize)
      })
  }

  //Add a circle layer
  addCircle(erasmus: Erasmus, maxSize:number) {
    var circle = L.circleMarker([erasmus.lat, erasmus.lng], {
      radius:  this.scaledRadius(erasmus.plazas, maxSize)
    })
    // Add circle tooltip
    circle.bindPopup("<b>País: </b>" + erasmus.pais + "<br>" + "<b>Plazas: </b>" + erasmus.plazas)
    this.layers.push( circle )
  }

  scaledRadius(val:number, maxVal:number) {
    let multiplier = 100
    if (val > maxVal) return multiplier
    return multiplier * (val / maxVal);
  }

}

