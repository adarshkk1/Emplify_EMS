import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  registerObj = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-z\s]*$/)]],
    emailId: ['', [Validators.required, Validators.email]],
    mobileNo: [''],
    password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[@$!%*#?&])(?=.*[a-z])(?=.*[A-Z]).{6,}/)]]
  })

  postRegisterObj: any;



  loggedUserObj: any;

  constructor(private fb: FormBuilder, private regSrv: EmployeeService, private router: Router,private toastr:ToastrService) {

    const local = localStorage.getItem('Userdea');
    if (local != null) {
      this.loggedUserObj = JSON.parse(local);
    }
  }




  // Registration

  onRegister() {

    this.postRegisterObj = this.registerObj.value;
    this.regSrv.getRegister().subscribe((res: any) => {
      const user = res.find((a: any) => {
        return a.emailId === this.postRegisterObj.emailId;
      })
      this.regSrv.getEmployees().subscribe((res: any) => {
        const isEmployee = res.find((a: any) => {
          return a.email === this.postRegisterObj.emailId;
        })

        if (!user && isEmployee) {
          this.regSrv.registerUser(this.postRegisterObj).subscribe((res: any) => {
            this.toastr.success('Registered Successfully')
            this.navigateToLogin()
          })
        }
        else if(!isEmployee) {
          this.toastr.error("Email id not exist, Please contact Admin to access services")
        }
        else{
          this.toastr.info('User already exist')
        }

        this.registerObj.reset();
      })

    }

  )}
 
  navigateToLogin(){
      this.router.navigate(['/login'])
    }
}
