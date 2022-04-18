import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {Erasmus} from "../models/Erasmus";

@Injectable({
  providedIn: 'root'
})
export class ErasmusService {

  constructor(private http: HttpClient) { }

  // Get number of Erasmus offers for Unizar students for studying abroad
  getErasmusOut():Observable<Erasmus[]> {
    return this.http.get<Erasmus>(environment.url + '/erasmus/out').pipe(
      map((data: any) => {
        // Transform data to fit Erasmus model
        var erasmusList:Erasmus[] = []
        data.forEach( (erasmus:any) => {
          erasmusList.push({pais: erasmus._id.pais, plazas: erasmus.plazas})
        })
        return erasmusList;
      })
    )
  }
}
