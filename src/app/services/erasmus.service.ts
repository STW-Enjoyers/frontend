import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {Erasmus} from "../models/Erasmus";
import {GeocodeService} from "./geocode.service";

@Injectable({
  providedIn: 'root'
})
export class ErasmusService {

  constructor(private http: HttpClient,  private coordinatesService: GeocodeService) { }

  // Get number of Erasmus offers for Unizar students for studying abroad
  getErasmusOut():Observable<Erasmus[]> {
    return this.http.get<Erasmus>(environment.url + '/erasmus/out').pipe(
      map((data: any) => {
        // Transform data to fit Erasmus model
        let erasmusList:Erasmus[] = []
        data.forEach( (erasmus:any) => {
          let coordinates = this.coordinatesService.geocode(erasmus._id.pais) ?? {lat:0, lng: 0};
          erasmusList.push({
            pais: erasmus._id.pais,
            plazas: erasmus.plazas,
            lat: coordinates.lat,
            lng: coordinates.lng
          })
        })
        return erasmusList;
      })
    )
  }

  // Get number of Erasmus offers for studying at Unizar this year
  getErasmusIn():Observable<Erasmus> {
    return this.http.get<Erasmus>(environment.url + '/erasmus/in').pipe(
      map((data: any) => {
        // Transform data to fit Erasmus model
        let erasmus:Erasmus;
        let coordinates = this.coordinatesService.geocode("España") ?? {lat:0, lng: 0};
        var plazas = data.map((erasmus:any) =>{
          return erasmus.plazas
        }).reduce((a: number, b: number) => a + b, 0)
        return {
          pais: "España",
          plazas: plazas,
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      })
    )
  }

  // Get number of Erasmus offers for studying at Unizar this year
  getErasmusInAll():Observable<Erasmus[]> {
    return this.http.get<Erasmus>(environment.url + '/erasmus/in').pipe(
      map((data: any) => {
        // Transform data to fit Erasmus model
        let erasmusList:Erasmus[] = []
        data.forEach( (erasmus:any) => {
          let coordinates = this.coordinatesService.geocode(erasmus._id.pais) ?? {lat:0, lng: 0};
          erasmusList.push({
            pais: erasmus._id.pais,
            plazas: erasmus.plazas,
            lat: coordinates.lat,
            lng: coordinates.lng
          })
        })
        return erasmusList;
      })
    )
  }
}
