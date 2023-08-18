import { Injectable,EventEmitter, Output } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  SignIn(Login): Observable < any > {
    return this.http.post(environment.hostUrl + 'login', Login)
    .pipe(catchError(this.formatErrors));
  }

  getEmailId(UserName): Observable < any > {
    return this.http.get(environment.hostUrl + 'getEmailId/' + UserName)
    .pipe(catchError(this.formatErrors));
  }

  ChangePassword(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'changepassword',  obj )
      .pipe(catchError(this.formatErrors));
  } 

  insertupdateemployeeprofile(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'insertupdateemployeeprofile',  obj )
      .pipe(catchError(this.formatErrors));
  } 

  addNotes(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'addNotes',  obj )
      .pipe(catchError(this.formatErrors));
  } 

  
  getAllNotes(userid): Observable < any > {
    return this.http.get(environment.hostUrl + 'mynotes/'+userid)
      .pipe(catchError(this.formatErrors));
  } 

  emailExist(email): Observable < any > {
    return this.http.get(environment.hostUrl + 'emailExist/' + email)
    .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
