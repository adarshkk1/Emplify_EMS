import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.scss'
})
export class EmployeelistComponent {
  @Input() employee: Employee;
  @Output() onRemoveEmployee = new EventEmitter();
  @Output() onEditEmployee = new EventEmitter();

  constructor() {
    this.employee = {
      firstname: '',
      lastname: '',
      email:'',
      birthdate: '',
      gender: '',
      education: '',
      company: '',
      department:'',
      jobExperience: 0,
      salary: 0,
      profile: '',
    };
  }

  

 deleteEmployeeClicked() {
    this.onRemoveEmployee.emit(this.employee._id)
  }

  
  editEmployeeClicked(){
    this.onEditEmployee.emit(this.employee);
  }
}


