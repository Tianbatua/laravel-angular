import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  	// this.authService.getProfile().subscribe((profile: any) => {
  	// 	console.log(profile);
  	// 	this.username = profile.user.username;
  	// 	this.email = profile.user.email;
  	// });
  	this.user = JSON.parse(this.authService.getProfile());
  	console.log(this.user);
  }

}
