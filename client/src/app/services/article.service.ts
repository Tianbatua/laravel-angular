import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class ArticleService {

	private baseUrl = 'http://localhost:8000/api';
  options;

  constructor(
  	private http:HttpClient,
  	private authService: AuthService
  ) { }

  articleList(){
  	return this.http.get(this.baseUrl + '/articles');
  }

  myArticles(){
    this.authService.createAuthenticationHeaders();
    this.options = this.authService.options;
    return this.http.get(this.baseUrl + '/myarticles', this.options);
  }

  addArticle(data){
    console.log(data);
  	this.authService.createAuthenticationHeaders();
  	this.options = this.authService.options;
  	return this.http.post(this.baseUrl + '/addArticle', data, this.options);
  }

  editArticle(data){
    this.authService.createAuthenticationHeaders();
    this.options = this.authService.options;
    return this.http.post(this.baseUrl + '/editArticle', data, this.options);
  }

  deleteArticle(data){
    this.authService.createAuthenticationHeaders();
    this.options = this.authService.options;
    return this.http.post(this.baseUrl + '/deleteArticle/' + data, this.options);
  }



}
