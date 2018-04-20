import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public form = {
		email: null,
		password: null
	}

  public error = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
  	this.authService.login(this.form).subscribe(
  		data => this.handleResponse(data),
  		error => this.handleError(error)
  	);
  	// console.log(this.form);
  }

  handleResponse(data){
    this.authService.storeUserData(data.access_token, data.user);
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);
  }

  handleError(error){
    this.error = error.error.error;
  }

  ngOnInit() {
  }

}
