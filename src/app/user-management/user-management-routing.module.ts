import { UserMgmntComponent } from './user-mgmnt/user-mgmnt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const USER_ROUTES: Routes = [
    { 
        path: '', // default route of the module
        component: UserMgmntComponent
    }
];

@NgModule({
  imports: [ RouterModule.forChild(USER_ROUTES) ],
  exports: [ RouterModule ]
})
export class UserManagementRoutingModule{ } 