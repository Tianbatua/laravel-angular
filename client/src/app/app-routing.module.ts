import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';


const appRoutes : Routes = [
	
	{ 
  	path: '', 
  	component: HomeComponent
  },
  { 
  	path: 'signup', 
  	component: SignupComponent,
  	// canActivate: [NotAuthGuard] 
  },
  { 
  	path: 'login', 
  	component: LoginComponent
  },
  { 
  	path: 'profile', 
  	component: ProfileComponent,
  	// canActivate: [AuthGuard]
	},
  { 
  	path: '**', 
  	component: HomeComponent 
	}

]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
