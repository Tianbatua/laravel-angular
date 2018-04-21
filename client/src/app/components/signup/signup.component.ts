import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	public form = {
		email: null,
		username: null,
		password: null,
		password_confirmation: null
	} 

	public error = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
  	this.authService.signup(this.form).subscribe(
  		data => this.handleResponse(data),
  		error => this.handleError(error)
  	);
  	console.log(this.form);
  }

  handleResponse(data){
    this.authService.storeUserData(data.access_token, data.user);
    setTimeout(()=> {
      this.router.navigate(['/home']);
    }, 500)
  }

  handleError(error){
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
