import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from 'rxjs/Observable';



@Injectable()
export class AuthService {

	private baseUrl = 'http://localhost:8000/api';
	authToken;
  user;
  options;
  p;

  constructor(private http:HttpClient) { }

  createAuthenticationHeaders(){
    this.loadToken();
    this.options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'bearer' + ' ' + this.authToken
      })
    };
  }

  signup(data){
  	return this.http.post(this.baseUrl + '/signup', data);
  }

  login(data){
  	return this.http.post(this.baseUrl + '/login', data);
  }

  // Function to get token from client local storage
  loadToken(){
    const token = localStorage.getItem('token'); // Get token and asssign to variable to be used elsewhere
    this.authToken = token;
  }

  // Store user's data in client local storage
  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Check if user's loggin expiered
  loggedInExpired(){
    const jwtHelper: JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem('token');
    return jwtHelper.isTokenExpired(token);
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Get user's profile data
  getProfile(){
    this.createAuthenticationHeaders();
    return this.http.get(this.baseUrl + '/me', this.options);
  }

  // Update user's profile data
  updateProfile(data){
    console.log(JSON.stringify(data));
    return this.http.post(this.baseUrl + '/updateProfile', JSON.stringify(data), this.options);
  }
  }

}
