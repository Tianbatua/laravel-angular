import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

	article = {
    body: null
  };

  constructor(
  	private ArticleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
  	this.ArticleService.addArticle(this.article).subscribe(
  		data => this.handleResponse(data),
  		error => this.handleError(error)
  	);
  	// console.log(this.article);
  }

  handleResponse(data){
    setTimeout(()=> {
      this.router.navigate(['/home']);
    }, 500)
  }

  handleError(error){
    this.error = error.error.errors;
  }

}
