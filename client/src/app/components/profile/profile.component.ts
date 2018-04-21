import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user = {

    email: null,
    username: null,
    address: null,
    city: null,
    province: null,
    country: null,
    label: null,
    postal_code: null
  } 

  public error = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile: any) => {
      this.user = profile;
      console.log(profile);
    });
  }

  onUpdate() {
    console.log(this.user);
    this.authService.updateProfile(this.user).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
    
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
