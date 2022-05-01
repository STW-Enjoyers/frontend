import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Erasmus} from "../models/Erasmus";
import {environment} from "../../environments/environment";
import {GradeProfile} from "../models/GradeProfile";
import {Comment} from "../models/Comment";
import {Grade} from "../models/Grade";

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  header = {headers: new HttpHeaders({NoAuth: 'True'})}; //For those that don't need authorization
  constructor(private http: HttpClient) { }

  // Get number of Erasmus offers for Unizar students for studying abroad
  getGradeProfile(idCarrera:string):Observable<GradeProfile> {
    return this.http.get<GradeProfile>(environment.url + '/gradeProfile?idCarrera=' + idCarrera).pipe(
      map((data: any) => {
        // Transform data to fit Erasmus model
        return <GradeProfile>{
          comments: data.comments,
          graduated: data.graduated.graduated,
          changed: data.graduated.graduated,
          average: data.graduated.average,
          abandoned: data.graduated.abandoned
        };
      }))
  }

  postComment(grade: Grade, comment: Comment) {
    //Needs JWT auth
    return this.http.post(
      environment.url + '/comment?idCarrera=' + grade.idCarrera + '&' + "cuerpo=" + comment.body,
      this.header
    );
  }
}
