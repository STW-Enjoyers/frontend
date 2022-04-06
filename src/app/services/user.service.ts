import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  actUser: User = {
    username: '',
    email: '',
    password: '',
  };
  header = {headers: new HttpHeaders({NoAuth: 'True'})}; //For those that don't need authorization
  constructor(private http: HttpClient) {
  }

  postUser(user: User) {
    return this.http.post(environment.url + '/register', user, this.header);
  }

  login(user: User) {
    console.log('USER:' + JSON.stringify(user))
    return this.http.post(
      environment.url + '/login',
      user,
      this.header
    );
  }

  getProfile() {
    //Needs JWT auth
    return this.http.get(environment.url + '/profile');
  }

  //Aux
  setToken(token: string) {
    console.log('Setting: ' + token);
    localStorage.setItem('token', token);
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
