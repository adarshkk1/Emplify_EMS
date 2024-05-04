import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LeaveService { 
  constructor(private http: HttpClient) { }

  getLeaves(){
    return this.http.get('http://localhost:8000/getLeaves');
  }

  addLeave(leave: any){
    return this.http.post('http://localhost:8000/addLeave', leave);
  }

  updateLeave(leave: any) {
    console.log(leave);
    return this.http.put(`http://localhost:8000/updateLeave`, leave);
  }

}