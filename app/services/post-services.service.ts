import { Injectable,EventEmitter, Output } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostServicesService {

  constructor(private http: HttpClient) { }

  UpdateAdminProfile(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'insertupdateemployeeprofile',  obj )
      .pipe(catchError(this.formatErrors));
  }

  sendMailForSuggestion(obj: any) {
    return this.http.post(environment.hostUrl + 'sendSuggestionMail',  obj )
      .pipe(catchError(this.formatErrors));
      
  }

  sendMailForChangePassword(obj: any) {
    return this.http.post(environment.hostUrl + 'sendChangePasswordMail',  obj )
      .pipe(catchError(this.formatErrors));
      
  }

  sendMailForProfileUpdate(obj: any) {
    return this.http.post(environment.hostUrl + 'sendUpdateProfileMail',  obj )
      .pipe(catchError(this.formatErrors));
      
  }



  UploadProfilePick(formData,registrationid): Observable < any > {
    return this.http.post(environment.hostUrl + 'uploadpicture/' + registrationid,formData)
      .pipe(catchError(this.formatErrors));

  }

  UploadProfilePicture(data): Observable < any > {
    return this.http.post(environment.hostUrl + 'UpdateProfilePicture/',data)
      .pipe(catchError(this.formatErrors));

  }

  GetUpdatedProfilePicturePath(registrationid): Observable < any > {
    return this.http.get(environment.hostUrl + 'getprofilePic/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  CreateFile(obj: any):any {
    return this.http.post(environment.hostUrl + 'fileCreation/' ,obj).toPromise();
   
  }

  AssignFile(obj: any):any {
    return this.http.post(environment.hostUrl + 'assignfile/' ,obj).toPromise();
   
  }

  assignFile_forReopenFile(obj: any):any {
    return this.http.post(environment.hostUrl + 'assignFile_forReopenFile/' ,obj).toPromise();
   
  }


  update_WorkAssign(obj: any):any {
    return this.http.post(environment.hostUrl + 'update_WorkAssign/' ,obj).toPromise();
   
  }

  moveFile(obj: any):any {
    return this.http.post(environment.hostUrl + 'moveFile/' ,obj).toPromise();
   
  }
  

  FileWork(obj: any):any {
    return this.http.post(environment.hostUrl + 'fileWork/' ,obj).toPromise();
     
  }

  receivefile(obj: any):any {
    return this.http.post(environment.hostUrl + 'receiveFile/' ,obj).toPromise()
      
  }

  CloseFile(obj: any):any {
    return this.http.post(environment.hostUrl + 'fileClose/', obj).toPromise();
  }

  AssignedFile_ForClosed(obj: any):any {
    return this.http.post(environment.hostUrl + 'AssignedFile_ForClosed/', obj).toPromise();
  }

  ReopenFile(obj: any):any {
    return this.http.post(environment.hostUrl + 'fileReopen/', obj).toPromise();
  }

  SendMailToAllDepartmentUser(obj: any, msg :any): Observable < any > {
    return this.http.post(environment.hostUrl + 'sendToAllDepartmentUserMail/' + msg , obj  )
      .pipe(catchError(this.formatErrors));
  }

  SendMailForFileClose(obj: any, filename :any): Observable < any > {
    return this.http.post(environment.hostUrl + 'SendMailForFileClose/' + filename, obj  )
      .pipe(catchError(this.formatErrors));
  }

  InsertSendMailForFileClose(sendData :any): Observable < any > {
    return this.http.post(environment.hostUrl + 'InsertSendMailForFileClose/', sendData  )
      .pipe(catchError(this.formatErrors));
  }

  storeMessageInformation(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'storeMessageInformation/' , obj  )
      .pipe(catchError(this.formatErrors));
  }

  SendMailToAllGuestList(obj: any, msg :any): Observable < any > {
    return this.http.post(environment.hostUrl + 'sendMailtoGuest/' + msg , obj  )
      .pipe(catchError(this.formatErrors));
  }


  addDepartment(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'addDepartment/', obj  )
      .pipe(catchError(this.formatErrors));
  }


  updateDepartment(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'updateDepartment/', obj  )
      .pipe(catchError(this.formatErrors));
  }

  // updateDepartmentEmailId(obj: any):any {
  //   return this.http.post(environment.hostUrl + 'updateDepartmentEmailId/', obj  ).toPromise()
      
  // }
  updateDepartmentDesignation(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'updateDepartmentDesignation/', obj  )
      .pipe(catchError(this.formatErrors));
  }
  

  updateDepartmentEmailId(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'updateDepartmentEmailId/', obj  )
      .pipe(catchError(this.formatErrors));
  }

  updateHOD(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'updateHOD/', obj  )
      .pipe(catchError(this.formatErrors));
  }

  AddDesignation(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'InsertDesignation/', obj  )
      .pipe(catchError(this.formatErrors));
  }

  updateDesignation(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'updateDesignation/', obj  )
      .pipe(catchError(this.formatErrors));
  }

  DeleteDesignation(obj:any):Observable<any>{
    return this.http.post(environment.hostUrl + 'DeleteDesignation',obj)
    .pipe(catchError(this.formatErrors));
  }

  AddUser(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'insertUser/', obj  )
      .pipe(catchError(this.formatErrors));
  }

  updateUser(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'updateUser/', obj  )
      .pipe(catchError(this.formatErrors));
  }

  EnableDisableUser(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'enabledisableUser/', obj  )
      .pipe(catchError(this.formatErrors));
  }

  SendMailToFileInitialisedUser(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'sendFileCreationMail/' , obj  )
      .pipe(catchError(this.formatErrors));
  }

  userbased_departmentmapping(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'userbased_departmentmapping/' , obj  )
      .pipe(catchError(this.formatErrors));
  }

  sendFileMail_forReceiver(obj: any, emailid:any): Observable < any > {
    return this.http.post(environment.hostUrl + 'sendFileReceivedMail_forReceiver/' + emailid , obj  )
      .pipe(catchError(this.formatErrors));
  }

  sendFilemail_forSender(receiverdata:any, emailid:any): Observable < any > {
    return this.http.post(environment.hostUrl + 'sendFileMail_forSender/' + emailid , receiverdata  )
      .pipe(catchError(this.formatErrors));
  }

  fileNameExist(filename: any): any {
    return this.http.post(environment.hostUrl + 'fileNameExist/' , filename).toPromise();
  }

  SendFileMovementMail_forReceiver(profiledetail: any, assignedFileData:any): Observable < any > {
    return this.http.post(environment.hostUrl + 'SendFileMovementMail_forReceiver' , {profiledetail, assignedFileData}   )
      .pipe(catchError(this.formatErrors));
  }

  SendFilMovementMail_forSender(obj: any): Observable < any > {
    return this.http.post(environment.hostUrl + 'SendFilMovementMail_forSender/' , obj  )
      .pipe(catchError(this.formatErrors));
  }

  insertHoliday(orgData: any):any {
    return this.http.post(environment.hostUrl + 'insertHoliday/', orgData )
    .pipe(catchError(this.formatErrors));
  }

  insertLeaveInfo(orgData: any):any {
    return this.http.post(environment.hostUrl + 'insertLeaveInfo/', orgData )
    .pipe(catchError(this.formatErrors));
  }


  update_WorkAssign_forRevertOption(obj: any):any {
    return this.http.post(environment.hostUrl + 'update_WorkAssign_forRevertOption/' ,obj).toPromise();
   
  }

  moveFile_forRevertOption(obj: any):any {
    return this.http.post(environment.hostUrl + 'moveFile_forRevertOption/' ,obj).toPromise();
  }

  AddCategory(addCategoryData: any):Observable <any> {
    return this.http.post(environment.hostUrl + 'AddCategory', addCategoryData)
    .pipe(catchError(this.formatErrors));
  }

  updateCategory(categoryData: any):Observable <any> {
    return this.http.post(environment.hostUrl + 'updateCategory', categoryData)
    .pipe(catchError(this.formatErrors));
  }

  updateFileHolidaysData(fileholidays: any):Observable <any> {
    return this.http.post(environment.hostUrl + 'updateFileHolidaysData', fileholidays)
    .pipe(catchError(this.formatErrors));
  }

  UpdateSuggestion_IdBased(suggestionData):Observable <any> {
    return this.http.post(environment.hostUrl + 'UpdateSuggestion_IdBased', suggestionData)
    .pipe(catchError(this.formatErrors));
  }

  fileupload(file_id:any,formData: any) {
    return this.http.post(environment.hostUrl + 'fileupload/' + file_id, formData)
    .pipe(catchError(this.formatErrors));
  }

  insertAttachedFile(filename, attachedFile):Observable <any> {
    return this.http.post(environment.hostUrl + 'insertAttachedFile/'+ filename , attachedFile)
    .pipe(catchError(this.formatErrors));
  }


  fileupload_forclosingfile(formData: any) {
    return this.http.post(environment.hostUrl + 'fileupload_forclosingfile', formData)
    .pipe(catchError(this.formatErrors));
  }


  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
