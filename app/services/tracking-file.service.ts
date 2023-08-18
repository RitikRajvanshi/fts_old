import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackingFileService {

  constructor(private http: HttpClient) { }

  
  getProfileDetails(RegistrationId): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_FileClosing/' + RegistrationId)
      .pipe(catchError(this.formatErrors))
  }

  getFileName_forfiletracking(RegistrationId, DepartmentId): Observable<any> {
    return this.http.get(environment.hostUrl + 'getFileName_forfiletracking/' + RegistrationId + '/'+ DepartmentId)
      .pipe(catchError(this.formatErrors))
  }

  getFileName(RegistrationId): Observable<any> {
    //return this.http.get(environment.hostUrl + 'getAllFile/' + DepartmentId)
    return this.http.get(environment.hostUrl + 'getAllTrackingFile/' + RegistrationId)
      .pipe(catchError(this.formatErrors))
  }

  getAllCloseFile(DepartmentId): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllCloseFile/' + DepartmentId)
      .pipe(catchError(this.formatErrors))
  }

  getFileTrackingData(file_id): Observable<any> {
    return this.http.get(environment.hostUrl + 'getFileWorkByFileId/' + file_id)
      .pipe(catchError(this.formatErrors))
  }

  getAllFileName_forallfiletracking(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllFileName_forallfiletracking')
      .pipe(catchError(this.formatErrors))
  }


  getAllFileCount(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllFileCount')
      .pipe(catchError(this.formatErrors))
  }

  formatErrors(error: any) {
    return throwError(error.error);
  }



}
