import { AppResponse, AppError } from './app.response';

export class AppUtil {

    static isNotNullAndEmpty(list: Array<any>): boolean {
        return list != null && list.length > 0;
    }

    static handleError(errorResponse: any, appResponse: AppResponse) {
        appResponse.hasError = true;
        debugger;
        if (errorResponse.json() != null) {
            appResponse.error = errorResponse.json() as AppError;
        }
        else {
            appResponse.error = new AppError();
            appResponse.error.errorMessage = errorResponse.errorMessage;
            appResponse.error.errorCode = errorResponse.errorCode;
        }
        appResponse.error.httpStatusCode = errorResponse.status;
        return appResponse;
    }
}