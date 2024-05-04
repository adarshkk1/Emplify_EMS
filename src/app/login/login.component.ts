import { Component } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(private regSrv : EmployeeService, private router:Router,private auth:AuthService ,private toastr:ToastrService ){     
    } 
   

    loginObj:any={
      "emailId":"",
      "password":""
    }
   
  onLogin(){
      this.regSrv.getRegister().subscribe((res:any)=>{
        
        const user = res.find((a:any)=>{
          return a.emailId===this.loginObj.emailId && a.password ===this.loginObj.password ;
        })
        if (user){     
          if(user.emailId===this.auth.admin){
            user.admin=true;
          }
          else{
            user.admin=false;
          }
        this.auth.setUser(user);
        
        this.toastr.success("login Succesfull");
        if(this.auth.user.admin){
          this.router.navigate(['/employee'])
        }
        else{
          this.router.navigate(['/leave'])
        }
       
        }
        else{
          this.toastr.error("Password doesn't match or User not Found. Please Register")
         
        }
      })
    }
   
    navigateToRegister(){
      this.router.navigate(['/signin'])
    }
   
  }
  
 