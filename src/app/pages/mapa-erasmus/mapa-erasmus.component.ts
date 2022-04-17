// Documentation, https://github.com/Asymmetrik/ngx-leaflet
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-mapa-erasmus',
  templateUrl: './mapa-erasmus.component.html',
  styleUrls: ['./mapa-erasmus.component.css']
})
export class MapaErasmusComponent implements OnInit {
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909)
  };

  layers = [
    L.circle([ 46.95, -122 ], { radius: 500000 }),
    L.polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
    L.marker([ 46.879966, -121.726909 ])
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
