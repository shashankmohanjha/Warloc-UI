import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { APP_URL } from '../../common-utils/app.constant';
import { AppResponse } from '../../common-utils/app.response';
import { AppUtil } from '../../common-utils/app.util';
import { UserDetail, PricingUser, AvisCountry, UserRole } from '../../model/user-detail.model';

@Injectable()
export class UserMgmntService {


  constructor(private httpClient: HttpClient) { }

  getUserManagementDetails(): Promise<AppResponse> {

    let appResponse: AppResponse = new AppResponse;
    return this.httpClient.get(APP_URL.serviceEndPointUrl + APP_URL.userMgmnt.fetchUserMgmntDetails).toPromise()
      .then((response: Response) => {
        appResponse.responseData = response;
        appResponse.hasError = false;
        return appResponse;
      }).catch(function (error: any) {
        return AppUtil.handleError(error, appResponse);
      });
  }

  saveOrUpdateUser(pricingUser: PricingUser): Promise<AppResponse> {

    let appResponse: AppResponse = new AppResponse;
    return this.httpClient.post(APP_URL.serviceEndPointUrl + APP_URL.userMgmnt.saveOrUpdateUser, pricingUser, {
      headers: { 'Content-Type': 'text/plain', 'Accept': 'application/json' }
    }).toPromise()
      .then((response: Response) => {
        appResponse.responseData = response;
        appResponse.hasError = false;
        return appResponse;
      }).catch(function (error: any) {
        return AppUtil.handleError(error, appResponse);
      });
  }
}
