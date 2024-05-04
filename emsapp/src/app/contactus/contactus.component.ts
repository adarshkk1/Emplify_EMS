import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {
  constructor(private toastr:ToastrService) { }

  ngOnInit():void {
  }

  send(){
   this.toastr.success("Thank You for contacting us , We will reach out you soon")
  }
}

