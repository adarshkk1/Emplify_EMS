import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'emsapp';

  constructor(private router: Router, private auth: AuthService){
    
  }
  get loggedUserObj() {
    return this.auth.user;
    }


 
  openLogin(){
    this.router.navigate(['/login'])
  }
  openSignup(){
    this.router.navigate(['/signin'])
  }

  logOff(){
    localStorage.removeItem('regUser')
    this.auth.setUser(null);
    this.router.navigate(['/home'])
  }
}
