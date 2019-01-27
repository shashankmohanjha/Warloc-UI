export class AppResponse {
    responseData: any;
    error: AppError;
    hasError: boolean;
}

export class AppError {
    httpStatusCode: number;
    errorCode: number;
    errorMessage: string;
}