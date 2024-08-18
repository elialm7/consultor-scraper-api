
export interface ScraperErrorMessage {
    message:string, 
    type:string, 
    reason?:string
}
export enum ScraperErrorType {
    UNEXPECTED_LOGIN_ERROR = "UNEXPECTED_LOGIN_ERROR", 
    INVALID_AUTH_STUDENT_ERROR = "INVALID_AUTH_STUDENT_ERROR",
    UNEXPECTED_ERROR ="UNEXPECTED_ERROR"
}
export class ScraperException extends Error {
    public constructor(message:string, type:string, reason?:string){
        super(message)
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
    public static New(info: ScraperErrorMessage): ScraperException{
        return new ScraperException(
            info.message, 
            info.type, 
            info.reason
        );
    }
}