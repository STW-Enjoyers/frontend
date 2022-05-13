import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map, Observable} from "rxjs";
import {Erasmus} from "../models/Erasmus";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  header = {headers: new HttpHeaders({NoAuth: 'True'})}; //For those that don't need authorization
  constructor(private http: HttpClient) {
  }

  // Register a new user
  postUser(user: User):Observable<User> {
    return this.http.post<User>(
      environment.url + '/register', user, this.header,
    ).pipe(
      map((user: any) => {
        // Update session token
        this.setToken(user.token)
        // Update session user id
        this.setUserId(user.doc._id)
        // Return user info
        return <User> {
          username: user.doc.username,
          email: user.doc.email,
          admin: user.doc.admin,
          banned: user.doc.banned,
        };
      })
    )
  }

  login(user: User) {
    return this.http.post(
      environment.url + '/login',
      user,
      this.header
    ).pipe(
      map((data: any) => {
        // Update session token
        this.setToken(data.token)
        this.setUserId(data._id)
      })
    )
  }

  getProfile():Observable<User> {
    //Needs JWT auth
    return this.http.get<User>(environment.url + '/profile').pipe(
      map((data: any) => {
        return <User>data.user;
      })
    );
  }

  // Change current logged user username
  changeUsername(username:string):Observable<any> {
    //Needs JWT auth
    return this.http.get(environment.url + '/changeUsername?username=' + username);
  }

  // Change current logged user username
  changePassword(email:string, actualPassword:string, newPassword:string):Observable<any> {
    //Needs JWT auth
    return this.http.post(environment.url + '/changePassword',
      {
        email:email,
        password: actualPassword,
        newPassword: newPassword
      });
  }

  //Aux
  setToken(token: string) {
    console.log('Setting: ' + token);
    localStorage.setItem('token', token);
  }

  setUserId(id:string) {
    console.log('userId: ' + id);
    localStorage.setItem('userId', id);
  }

  getUserId():string {
    return localStorage.getItem('userId') ?? "";
  }

  getToken() {
    return localStorage.getItem('token');
  }

  unSetToken() {
    localStorage.removeItem('token');
  }

  getUserData() {
    var token = localStorage.getItem('token');
    if (token) {
      var userData = atob(token.split('.')[1]);
      return JSON.parse(userData);
    } else return null;
  }

  isLoggedIn() {
    var userData = this.getUserData();
    if (userData) return userData.exp > Date.now() / 1000;
    //TODO cambiar el 1000
    else return null;
  }

}
