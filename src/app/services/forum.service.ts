import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Erasmus} from "../models/Erasmus";
import {environment} from "../../environments/environment";
import {GradeProfile} from "../models/GradeProfile";
import {Comment} from "../models/Comment";
import {Response} from "../models/Response";
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
        console.log("graduated: " + data.gradeProfile.graduated.graduated)
        console.log("changed: " + data.gradeProfile.graduated.changed)
        return <GradeProfile>{
          _id: idCarrera,
          estudio: data.gradeData.estudio,
          localidad: data.gradeData.localidad,
          comments: data.gradeProfile.comments,
          graduated: data.gradeProfile.graduated.graduated,
          changed: data.gradeProfile.graduated.changed,
          average: data.gradeProfile.graduated.average,
          abandoned: data.gradeProfile.graduated.abandoned
        };
      }))
  }

  getHistoricalGrades(idCarrera:string):Observable<any> {
    return this.http.get<Grade[]>(environment.url + '/grades/historical/' + idCarrera)
  }

  postComment(gradeProfile: GradeProfile, comment: Comment) {
    //Needs JWT auth
    return this.http.post(
      environment.url + '/comment?idCarrera=' + gradeProfile._id + "&cuerpo=" + comment.body,
      this.header
    );
  }

  postResponse(idCarrera:string, idComment: string, responseBody: string) {
    //Needs JWT auth
    return this.http.post(
      environment.url + '/reply?idCarrera=' + idCarrera + "&cuerpo=" + responseBody + "&_id=" + idComment,
      this.header
    );
  }

  postUpvote(idCarrera: string, idComment: string, idResponse?: string) {
    //Needs JWT auth
    return this.http.post(
      // @ts-ignore
    environment.url + `/upVote?idCarrera=${idCarrera}&idcom=${idComment}${ (idResponse) ? `&idrep=${idResponse}` : `` }`,
      this.header
    );
  }

  postDownvote(idCarrera: string, idComment: string, idResponse?: string) {
    //Needs JWT auth
    return this.http.post(
      // @ts-ignore
      environment.url + `/cancelUpVote?idCarrera=${idCarrera}&idcom=${idComment}${ (idResponse) ? `&idrep=${idResponse}` : `` }`,
      this.header
    );
  }
}
