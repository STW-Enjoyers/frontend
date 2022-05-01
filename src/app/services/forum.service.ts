import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Erasmus} from "../models/Erasmus";
import {environment} from "../../environments/environment";
import {GradeProfile} from "../models/GradeProfile";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }

  // Get number of Erasmus offers for Unizar students for studying abroad
  getGradeProfile(idCarrera:string):Observable<GradeProfile> {
    return this.http.get<GradeProfile>(environment.url + '/gradeProfile?idCarrera=' + idCarrera).pipe(
      map((data: any) => {
        // Transform data to fit Erasmus model
        console.log(data)
        return <GradeProfile>{
          comments: data.comments,
          graduated: data.graduated.graduated,
          changed: data.graduated.graduated,
          average: data.graduated.average,
          abandoned: data.graduated.abandoned
        };
      }))
  }
}
