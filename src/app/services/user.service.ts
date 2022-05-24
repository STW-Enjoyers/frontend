import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map, Observable} from "rxjs";
import {Erasmus} from "../models/Erasmus";
import {YearlyUsers} from "../models/YearlyUsers";
//import { userInfo } from 'os';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  header = {headers: new HttpHeaders({NoAuth: 'True'})}; //For those that don't need authorization

  constructor(private http: HttpClient) { }

  // Post new registered user
  postUser(user: User):Observable<User> {
    return this.http.post<User>(
      environment.url + '/user/register', user, this.header,
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

  // Post email and password and get user token
  login(user: User) {
    return this.http.post(
      environment.url + '/user/login',
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

  // Ger user given a user id
  getProfile():Observable<User> {
    //Needs JWT auth
    return this.http.get<User>(environment.url + '/user/' + this.getUserId() + '/profile').pipe(
      map((data: any) => {
        return <User>data.user;
      })
    );
  }

  // Change username given a user id and new username
  changeUsername(username:string):Observable<any> {
    //Needs JWT auth
    return this.http.get(environment.url + '/user/' + this.getUserId() + '/username?username=' + username);
  }

  // Change password given a user id and new password
  changePassword(email:string, actualPassword:string, newPassword:string):Observable<any> {
    //Needs JWT auth
    return this.http.post(environment.url + '/user/' + this.getUserId() + '/password',
      {
        email:email,
        password: actualPassword,
        newPassword: newPassword
      });
  }

  getYearly():Observable<YearlyUsers[]> {
    //Needs JWT auth
    return this.http.get<YearlyUsers>(environment.url + '/user/yearly').pipe(
      map((data: any) => {
        // Transform data to fit Erasmus model
        let yearlyUsersList:YearlyUsers[] = []
        data.forEach( (yearlyUsers:any) => {
          yearlyUsersList.push({
            _id: yearlyUsers._id,
            users: yearlyUsers.users
          })
        })
        return yearlyUsersList;
      })
    )
  }

  //Aux
  setToken(token: string) {
    //console.log('Setting: ' + token);
    localStorage.setItem('token', token);
  }

  setUserId(id:string) {
    //console.log('userId: ' + id);
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
