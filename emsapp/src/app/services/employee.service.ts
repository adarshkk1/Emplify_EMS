import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<Employee[]>("http://localhost:8000/getallemployee");
  }

  postEmployee(employee: Employee) {  
    return this.http.post<Employee>("http://localhost:8000/addemployee", employee);
  }
 
  deleteEmployee(id: any) {
    return this.http.delete(`http://localhost:8000/deleteemployee`,{body:{id:id}});
  }


  updateEmployee(employee: any) { 
    return this.http.put(`http://localhost:8000/updateemployee`, employee);
  }


  postRegister(user: any) {
    return this.http.post("http://localhost:8000/adduser", user);
  }

  registerUser(obj:any){
    return this.http.post("http://localhost:8000/adduser", obj)
  }

  
  getRegister() {
    return this.http.get("http://localhost:8000/getalluser");
  }
 

}
