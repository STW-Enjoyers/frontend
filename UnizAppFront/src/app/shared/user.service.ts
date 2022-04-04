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
  header = { headers: new HttpHeaders({ NoAuth: 'True' }) }; //For those that don't need authorization
  constructor(private http: HttpClient) {}
  postUser(user: User) {
    return this.http.post(environment.url + '/register', user, this.header);
  }
  login(authCredentials: any) {
    return this.http.post(
      environment.url + '/login',
      authCredentials,
      this.header
    );
  }
  getProfile() {
    //Needs JWT auth
    return this.http.get(environment.url + '/profile');
  }

  //Aux
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    localStorage.getItem('token');
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
