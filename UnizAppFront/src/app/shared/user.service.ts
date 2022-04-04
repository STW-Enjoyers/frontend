import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  actUser: User = {
    username: '',
    email: '',
    password: '',
  };
  constructor(private http: HttpClient) {}
  postUser(user: User) {
    return this.http.post(environment.url + '/register', user);
  }
  login(authCredentials: any) {
    return this.http.post(environment.url + '/login', authCredentials);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
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
