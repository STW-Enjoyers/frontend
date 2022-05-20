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

  // Get grade profile fiven an id
  getGradeProfile(idCarrera:string):Observable<GradeProfile> {
    return this.http.get<GradeProfile>(environment.url + '/gradeProfile/' + idCarrera + '/info').pipe(
      map((data: any) => {
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


  // Post comment on grade profile given an id and comment body
  postComment(gradeProfile: GradeProfile, comment: Comment) {
    //Needs JWT auth
    return this.http.post(
      environment.url + '/gradeProfile/' + gradeProfile._id + "/comment?cuerpo=" + comment.body,
      this.header
    );
  }

  // Post reply to a comment on grade profile given an grade id, comment id and reply body
  postResponse(idCarrera:string, idComment: string, responseBody: string) {
    //Needs JWT auth
    return this.http.post(
      environment.url + '/gradeProfile/' + idCarrera + "/comment/" + idComment + "/reply?cuerpo=" + responseBody ,
      this.header
    );
  }

  // Post upVote to a comment on grade profile given an grade id, comment id (and reply id if you
  // want to upVote a reply
  postUpvote(idCarrera: string, idComment: string, idResponse?: string) {
    //Needs JWT auth
    return this.http.post(
      // @ts-ignore
      environment.url + `/gradeProfile/${idCarrera}/comment/${idComment}${ (idResponse) ? `/reply/${idResponse}` : `` }/upVote`,
      this.header
    );
  }

  // Post downVote to a comment on grade profile given an grade id, comment id (and reply id if you
  // want to downVote a reply
  postDownvote(idCarrera: string, idComment: string, idResponse?: string) {
    //Needs JWT auth
    return this.http.post(
      // @ts-ignore
      environment.url + `/gradeProfile/${idCarrera}/comment/${idComment}${ (idResponse) ? `/reply/${idResponse}` : `` }/cancelUpVote`,
      this.header
    );
  }
}
