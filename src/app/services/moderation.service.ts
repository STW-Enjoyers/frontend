import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from "rxjs";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModerationService {
  header = {headers: new HttpHeaders({NoAuth: 'True'})}; //For those that don't need authorization
  constructor(private http: HttpClient) {}

  getComments():Observable<any> {
    return this.http.get<any>(environment.url + '/gradeProfile/comments/check')
  }

  verifyComment(degreeId:string, commentId:string):Observable<any> {
    return this.http.post(environment.url + 
      '/gradeProfile/' + degreeId + '/comment/' + commentId + '/verify', null
    )
  }

  verifyResponse(degreeId:string, commentId:string, responseId:string):Observable<any> {
    return this.http.post(environment.url + 
      '/gradeProfile/' + degreeId + '/comment/' + commentId + '/response/' + responseId + '/verify', null
    )
  }

  deleteComment(degreeId:string, commentId:string): Observable<any> {
    return this.http.delete(environment.url + 
      '/gradeProfile/' + degreeId + '/comment/' + commentId + '/delete')
  }
  
  deleteResponse(degreeId:string, commentId:string, responseId:string): Observable<any> {
    return this.http.delete(environment.url + 
      '/gradeProfile/' + degreeId + '/comment/' + commentId + '/response/' + responseId + '/delete')
  }

  banUser(userId:string): Observable<any> {
    return this.http.get(environment.url + '/user/' + userId + '/ban')
  }
}