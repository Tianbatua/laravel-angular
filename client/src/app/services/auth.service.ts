import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable()
export class AuthService {

	private baseUrl = 'http://localhost:8000/api';
	authToken;
  user;

  constructor(private http:HttpClient) { }

  signup(data){
  	return this.http.post(this.baseUrl + '/signup', data);
  }

  login(data){
  	return this.http.post(this.baseUrl + '/login', data);
  }

  // Function to get token from client local storage
  loadToken(){
    const token = localStorage.getItem('token'); // Get token and asssign to variable to be used elsewhere
    const user = localStorage.getItem('user'); 
    this.authToken = token;
    this.user = user;
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
  	this.loadToken();
    return this.user;
  }

}
