import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public articles = {
    // body: null
  } 

  constructor(
  	private ArticleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.ArticleService.articleList().subscribe(
  		data => this.handleResponse(data),
  		error => this.handleError(error)
  	);
  }

  handleResponse(data){
	  this.articles = Object.values(data);
	  console.log(this.articles);
  }

  handleError(error){
    this.error = error.error.error;
  }

}
