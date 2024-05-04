import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { LeaveComponent } from './leave/leave.component';
import { ApprovalComponent } from './approval/approval.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './authguard/auth.guard';
import { adminGuard } from './authguard/admin.guard';


const routes: Routes = [
  {path:"" , redirectTo:'home',pathMatch:'full'},
  // {path:"" , component:HomeComponent}, homepage view will come
  {path:"home" , component:HomeComponent},
  {path:"employee" , component:EmployeeComponent,canActivate:[adminGuard]},
  {path:"employeelist", component :EmployeelistComponent,canActivate:[adminGuard]},
  {path:"aboutus", component :AboutusComponent },
  {path:"contactus", component :ContactusComponent },
  {path:"login", component: LoginComponent},
  {path:"signin", component:SigninComponent},
  {path:"leave", component:LeaveComponent,canActivate:[authGuard]},
  {path:"approval",component:ApprovalComponent,canActivate:[adminGuard]},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
