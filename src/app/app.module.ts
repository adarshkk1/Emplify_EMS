import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'



import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { EmployeeComponent } from './employee/employee.component'
import { EmployeelistComponent } from './employeelist/employeelist.component'
import { AboutusComponent } from './aboutus/aboutus.component'
import { ContactusComponent } from './contactus/contactus.component'
import { LoginComponent } from './login/login.component'
import { SigninComponent } from './signin/signin.component'
import { CommonModule } from '@angular/common'
import { LeaveComponent } from './leave/leave.component';
import { ApprovalComponent } from './approval/approval.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    EmployeelistComponent,
    AboutusComponent,
    ContactusComponent,
    LoginComponent,
    SigninComponent,
    LeaveComponent,
    ApprovalComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 2000,
      positionClass:"toast-top-center",
      preventDuplicates:true,
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }