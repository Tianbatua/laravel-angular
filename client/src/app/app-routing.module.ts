import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateComponent } from './components/create/create.component';
import { MyarticlesComponent } from './components/myarticles/myarticles.component';


const appRoutes : Routes = [
	
	{ 
  	path: '', 
  	component: HomeComponent
  },
  { 
  	path: 'signup', 
  	component: SignupComponent, 
  },
  { 
  	path: 'login', 
  	component: LoginComponent
  },
  { 
  	path: 'profile', 
  	component: ProfileComponent,
	},
  { 
    path: 'myarticles', 
    component: MyarticlesComponent,
  },
  { 
    path: 'myarticles/add', 
    component: CreateComponent,
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
