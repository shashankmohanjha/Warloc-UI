import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMgmntComponent } from './user-mgmnt/user-mgmnt.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserMgmntService } from './user-mgmnt/user-mgmnt.service';
import { MatInputModule,MatFormFieldModule, MatSelectModule, MatListModule, MatButtonModule  } from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserMgmntComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserManagementRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    UserMgmntService
  ],
})
export class UserManagementModule { }
