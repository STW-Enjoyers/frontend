import { Injectable } from '@angular/core';
import { countries} from "../../countries";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor() { }

  // Returns coordinates of 'countryName' in decimal format
  geocode(countryName: string) {
    let match = countries.filter(country => {
      var country1 = this.removeAccents(country.pais).toLowerCase()
      var country2 = this.removeAccents(countryName).toLowerCase()
      var iguales = country1 === country2
      var substring = country1.includes(country2) || country2.includes(country1)
      return iguales || substring
    })
    if (!match){
       throwError("No se han podido obtener la coordenadas de " + countryName)
    }
    return this.parseDMS(match[0].coordenadas)
  }

  // Parse coordinates of countries list (countries.ts)
  // @ts-ignore
  parseDMS(input: string) {
    var directions= input.match(/[A-Z]/g);
    var grades = input.replace(/[A-Z]/g, "").split(/[^\d\w]+/);
    var lat:number, lng:number
    if (directions) {
      lat = this.convertDMSToDD(+grades[0], +grades[1], +grades[2], directions[0]);
      lng = this.convertDMSToDD(+grades[3], +grades[4], +grades[5], directions[1]);
    } else {
      lat = 0, lng = 0
      throwError("GeocodeService: Error al parsear la coordenadas de los paises")
    }
    return {lat: lat, lng: lng}
  }

  // Convert DMS coordinates to decimal format
   convertDMSToDD(degrees: number, minutes: number, seconds: number, direction: string) {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction == "S" || direction == "W") {
      dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
  }

  removeAccents (str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
