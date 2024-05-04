import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../services/leave.service';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
 leaveDetails:any;
 employee: any;
  leaveForm: FormGroup;

  constructor(private fb: FormBuilder, private leaveService: LeaveService, private auth:AuthService,private employeeService:EmployeeService ,private toastr:ToastrService) { 
    this.getAllLeaves() 
    this.getEmployee();
    
  }
  leaveData:any;
  ngOnInit() {
    this.leaveForm = this.fb.group({
      reason: ['', Validators.required],
      startdate:['', Validators.required],
      enddate:[ '', Validators.required],  
    });
  }

  submitLeave() {
    if (this.leaveForm.valid) {
      this.leaveData = this.leaveForm.value;   
    }

    
  }

  openModal(){
    const modal= document.getElementById('leaveForm');
    modal.style.display="block"
 }
 closeModal(){
   const modal= document.getElementById('leaveForm');
   modal.style.display="none";
   this.leaveForm.reset()
}

addLeave(){
  this.leaveData=this.leaveForm.value;
  this.leaveData.name=this.auth.user.name;
  this.leaveData.emailId=this.auth.user.emailId;
  this.leaveData.status='Pending';
  this.leaveService.addLeave(this.leaveData).subscribe((res:any)=>{
    this.getAllLeaves();
  })
  this.toastr.success('Leave Applied successfully, Sending for admin approval');   
}

getAllLeaves() {
  this.leaveService.getLeaves().subscribe((res:any)=>

  {
    this.leaveDetails=res.filter(leave=>{
      return leave.emailId==this.auth.user.emailId
    }); 
  })
  
}


getEmployee() {
  this.employeeService.getEmployees().subscribe((res: any) => {
    this.employee = res.find(employee => employee.email === this.auth.user.emailId);
  });
}

}
