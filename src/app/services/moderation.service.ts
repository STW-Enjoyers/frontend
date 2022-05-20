import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModerationService {

  constructor(private http: HttpClient) {}

  checkComments():Observable<any> {
    return this.http.get(environment.url + '/gradeProfile/comments/check').pipe(
      map((data: any) => {
        console.log(data)
        return data;
      })
    )
  }

  verifyComment(degreeId:string, commentId:string) {
    return this.http.get(environment.url + 
      '/gradeProfile/' + degreeId + '/comment/' + commentId + '/verify')
  }

  verifyResponse(degreeId:string, commentId:string, responseId:string) {
    return this.http.get(environment.url + 
      '/gradeProfile/' + degreeId + '/comment/' + commentId + '/response/' + responseId + '/verify')
  }

  deleteComment(degreeId:string, commentId:string) {
    return this.http.delete(environment.url + 
      '/gradeProfile/' + degreeId + '/comment/' + commentId + '/delete')
  }
  
  deleteResponse(degreeId:string, commentId:string, responseId:string) {
    return this.http.delete(environment.url + 
      '/gradeProfile/' + degreeId + '/comment/' + commentId + '/response/' + responseId + '/delete')
  }

  banUser(userId:string) {
    return this.http.get(environment.url + '/user/' + userId + '/ban')
  }
}