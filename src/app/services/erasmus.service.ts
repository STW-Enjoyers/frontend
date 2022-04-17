import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Erasmus} from "../models/Erasmus";

@Injectable({
  providedIn: 'root'
})
export class ErasmusService {

  constructor(private http: HttpClient) { }

  // Get number of Erasmus offers for studying at Unizar this year
  getErasmusIn():Observable<any> {
    return this.http.get(environment.url + '/erasmus/in');
  }
}
