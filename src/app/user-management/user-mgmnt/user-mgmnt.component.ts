import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { UserMgmntService } from './user-mgmnt.service';
import { UserDetail, PricingUser, AvisCountry, UserRole } from '../../model/user-detail.model';
import { AppError, AppResponse } from "../../common-utils/app.response";



@Component({
  selector: 'app-user-mgmnt',
  templateUrl: './user-mgmnt.component.html',
  styleUrls: ['./user-mgmnt.component.css']
})
export class UserMgmntComponent implements OnInit {

  isValidFormSubmitted = false;
  userDetail: UserDetail = new UserDetail();
  pricingUser: PricingUser = new PricingUser();
  pricingUsers: Array<PricingUser> = new Array<PricingUser>();
  roles: Array<UserRole> = new Array<UserRole>();
  countries: Array<AvisCountry> = new Array<AvisCountry>();
  corPermissions: Map<number, Map<number, string>> = new Map();


  constructor(private httpClient: HttpClient,
    private userMgmntService: UserMgmntService) { }

  ngOnInit() {

    this.httpClient.get('./assets/users.json').subscribe(
      data => {
        this.userDetail = data as UserDetail;
        if (this.userDetail == null) {
          this.userDetail = new UserDetail();
        }
        this.pricingUser.id = -2;
        this.pricingUsers = this.userDetail.pricingUsers;
    
        this.roles = this.userDetail.roles;
        this.countries = this.userDetail.avisCountries;
        this.userDetail.userManagementCommand = this.userDetail.userManagementCommand;
        this.corPermissions = this.userDetail.corPermissions;
        let corAccessMap: Map<number, string> = new Map();
        for (let country of this.countries) {
          corAccessMap[country.id] = "deny";
        }
        this.corPermissions[-1] = corAccessMap;
        this.corPermissions[-2] = corAccessMap;
      }
    );

    /*  this.userMgmntService.getUserManagementDetails().then(apiResponse => {
       if (apiResponse.hasError) {
         this.showErrorMessage(apiResponse.error);
       } else {
         this.updateUserMgmntDetails(apiResponse);
       }
     }); */
  }


  updateUserMgmntDetails(apiResponse: AppResponse) {
    if (this.userDetail == null) {
      this.userDetail = new UserDetail();
    }
    this.pricingUser.id = -2;
    this.userDetail = apiResponse.responseData;
    this.pricingUsers = apiResponse.responseData.pricingUsers;
    this.roles = apiResponse.responseData.roles;
    this.countries = apiResponse.responseData.avisCountries;
    this.userDetail.userManagementCommand = apiResponse.responseData.userManagementCommand;
    this.corPermissions = apiResponse.responseData.corPermissions;
    let corAccessMap: Map<number, string> = new Map();
    for (let country of this.countries) {
      corAccessMap[country.id] = "deny";
    }
    this.corPermissions[-1] = corAccessMap;
    this.corPermissions[-2] = corAccessMap;
  }

  onUserChange() {
    debugger;
    let filteredPricingUser = this.pricingUsers.find(
      puser => puser.id == this.pricingUser.id);

    this.pricingUser.id = filteredPricingUser.id;
    this.pricingUser.name = filteredPricingUser.name;
    this.pricingUser.extendedName = filteredPricingUser.extendedName;
    this.pricingUser.email = filteredPricingUser.email;
    this.pricingUser.userPrincipalName = filteredPricingUser.userPrincipalName;
    let date = filteredPricingUser.lastLoginDate;
    this.pricingUser.lastLoginDate = date == 'null' ? '' : date;
    this.pricingUser.roleIds = filteredPricingUser.roleIds;
    this.pricingUser.isActive = filteredPricingUser.isActive;
  }

  showErrorMessage(error: AppError) {
    if (error.errorMessage != null && error.errorMessage != '') {
      alert(error.errorMessage);
      return;
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  saveOrUpdateUser() {

    this.pricingUser.corPermission = this.corPermissions[this.pricingUser.id];
    this.pricingUser.action = this.pricingUser.id === -1 ? 'add' : 'edit';
    this.userMgmntService.saveOrUpdateUser(this.pricingUser).then(apiResponse => {

      if (apiResponse.hasError) {
        this.showErrorMessage(apiResponse.error);
      } else {
        alert("success");
        this.pricingUser = new PricingUser();
        this.updateUserMgmntDetails(apiResponse);
      }
    });
  }

  setCORAccessValue(countryId: number, access: string) {
    this.corPermissions[this.pricingUser.id][countryId] = access;
  }

  deleteUser() {
    this.pricingUser.action = "delete";
    this.userMgmntService.saveOrUpdateUser(this.pricingUser).then(apiResponse => {

      if (apiResponse.hasError) {
        this.showErrorMessage(apiResponse.error);
      } else {
        alert("success");
        this.pricingUser = new PricingUser();
        this.updateUserMgmntDetails(apiResponse);
      }
    });
  }
}
