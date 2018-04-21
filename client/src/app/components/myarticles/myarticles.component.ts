import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-myarticles',
  templateUrl: './myarticles.component.html',
  styleUrls: ['./myarticles.component.css']
})
export class MyarticlesComponent implements OnInit {

	public articles = {
    // body: null
  } 

  constructor(
  	private ArticleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.ArticleService.myArticles().subscribe(
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

  edit() {
    this.ArticleService.editArticle(id).subscribe(
      data => console.log(data),
      error => console.log(error)
    );  
  }

  remove() {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    console.log(value);
    this.ArticleService.deleteArticle(value).subscribe(
      data => console.log(data),
      error => console.log(error)
    );  
  }

}
