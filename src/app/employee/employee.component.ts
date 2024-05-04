import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators  } from '@angular/forms'; 
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  title = 'EmployeeCRUD';

  employeeForm: FormGroup;
//variables
  employees: Employee[];
  employeesToDisplay: any[];
  educationOptions = [
    '10th pass',
    'diploma',
    'graduate',
    'post graduate',
    'PhD',
  ];

  editEmpId:any;

  constructor(
    private fb: FormBuilder,
    private toastr:ToastrService,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = fb.group({});
  }

  //  initialize the form
  ngOnInit(): void {
    this.employeeForm = this.fb.group(
      {
        firstname: this.fb.control('',[Validators.required,Validators.pattern(/^[a-zA-z\s]*$/)]),
        lastname: this.fb.control('',[Validators.required,Validators.pattern(/^[a-zA-z\s]*$/)]),
        email:this.fb.control('',[Validators.required,Validators.email]),
        birthdate: this.fb.control('',[Validators.required]),
        gender: this.fb.control('',[Validators.required]),
        education: this.fb.control('',[Validators.required]),
        company: this.fb.control('Cognizant'),
        department:this.fb.control('',[Validators.required]),
        jobExperience: this.fb.control('',[Validators.required]),
        salary: this.fb.control('',[Validators.required]),
        profile:this.fb.control('')
      });
    this.getAllEmployee()
  }

  getAllEmployee() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employeesToDisplay = res.reverse();
    });
  }

  openModal() {
    const modal = document.getElementById("empinfo");
    modal.style.display = "block"
  }
  closeModal() {
    const modal = document.getElementById("empinfo");
    modal.style.display = "none";    
    document.getElementById('add-btn').style.display='block';
    document.getElementById('edit-btn').style.display='none'; 
    this.clearForm()
  }

  addEmployee() {
    let employee: Employee = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      email: this.email.value,
      birthdate: this.birthdate.value,
      gender: this.Gender.value,
      education: this.Education.value,
      company: this.Company.value,
      department:this.department.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      profile: this.profile.value,
    }; 
    this.employeeService.postEmployee(employee).subscribe((res) => {
      this.getAllEmployee();
      this.toastr.success('New empolyee added successfully');
      this.clearForm();
      this.closeModal()
    });  
  }

  removeEmployee(id: any): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.employeeService.deleteEmployee(id).subscribe((res) => {
        this.getAllEmployee()
      })
      this.toastr.success('Item deleted successfully');
    } 
    else {
      this.toastr.info('Delete cancelled');
    }
  }


  editEmployee(employee: any) {
    this.openModal();
    document.getElementById('add-btn').style.display='none';
    document.getElementById('edit-btn').style.display='block';
    this.employeeForm.patchValue({
      firstname: employee.firstname,
      lastname: employee.lastname,
      email: employee.email,
      birthdate: employee.birthdate,
      gender: employee.gender,
      education: employee.education,
      company:  employee.company,
      department: employee.department,
      jobExperience: employee.jobExperience,
      salary:  employee.salary,
      profile:employee.profile     
    })
    this.editEmpId=employee._id;
  }
  updateEmployee(){
    const updatedEmployee=this.employeeForm.value;
    // updatedEmployee.education=this.educationOptions[parseInt(this.employeeForm.value)]
    updatedEmployee._id=this.editEmpId;
    this.employeeService.updateEmployee(updatedEmployee).subscribe((res:any)=>{
      this.getAllEmployee();
      this.toastr.success('Details updated successfully');
      this.closeModal();
    })
  }


  

  searchEmployees(event: any) {
    let filteredEmployees: Employee[] = [];

    if (event === '') {
     this.getAllEmployee();
    } else {
      filteredEmployees = this.employeesToDisplay.filter((val, index) => {
        let targetKey = val.firstname.toLowerCase() + '' + val.lastname.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.employeesToDisplay = filteredEmployees;
    }
  }

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.email.setValue('');
    this.birthdate.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('Cognizant');
    this.department.setValue('');
    this.JobExperience.setValue('');
    this.Salary.setValue('');
    this.profile.setValue('');
  }

  public get FirstName(): FormControl {
    return this.employeeForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.employeeForm.get('lastname') as FormControl;
  }
  public get email(): FormControl {
    return this.employeeForm.get('email') as FormControl;
  }
  public get birthdate(): FormControl {
    return this.employeeForm.get('birthdate') as FormControl;
  }
  public get Gender(): FormControl {
    return this.employeeForm.get('gender') as FormControl;
  }
  public get Education(): FormControl {
    return this.employeeForm.get('education') as FormControl;
  }
  public get Company(): FormControl {
    return this.employeeForm.get('company') as FormControl;
  }
  public get department(): FormControl {
    return this.employeeForm.get('department') as FormControl;
  }
  public get JobExperience(): FormControl {
    return this.employeeForm.get('jobExperience') as FormControl;
  }
  public get Salary(): FormControl {
    return this.employeeForm.get('salary') as FormControl;
  }
  public get profile(): FormControl {
    return this.employeeForm.get('profile') as FormControl;
  }
}

