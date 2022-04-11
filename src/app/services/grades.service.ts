import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from 'src/environments/environment';
import { Grade } from '../models/Grade';
@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private http: HttpClient) {}

  getGrades(year?:number): Observable<Grade[]> {
    let endpoint:string = year == undefined ? `/grades/last` : `/grades/${year}`
    return this.http.get<Grade[]>(environment.url + endpoint);
  }
}
