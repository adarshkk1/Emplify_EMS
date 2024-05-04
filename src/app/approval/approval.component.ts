import { Component } from '@angular/core';
import { LeaveService } from '../services/leave.service';


@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent {
  leaveDetails: any[];

  constructor(private leaveService: LeaveService) {
    this.getAllLeaves();
  }

  getAllLeaves() {
    this.leaveService.getLeaves().subscribe((res: any) => {
      this.leaveDetails = res;
    });
  }

  approval(leave:any) {
    leave.status = 'Approved';
    this.leaveService.updateLeave(leave).subscribe((res: any) => {
      this.getAllLeaves();
    });
  }

  notApproval(leave: any) {
    leave.status = 'Rejected';
    this.leaveService.updateLeave(leave).subscribe((res: any)  => {
      this.getAllLeaves();
    });
  }
}