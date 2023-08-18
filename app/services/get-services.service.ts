import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetServicesService {

  private messageSource = new BehaviorSubject(0);
  currentFileCount = this.messageSource.asObservable();

  private messageSourceFileReceive = new BehaviorSubject(0);
  currentFileToBeReceivedCount = this.messageSourceFileReceive.asObservable();

  constructor(private http: HttpClient) { }

  GetProfileDetails(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getProfileDetails/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_AddDepartment(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_AddDepartment/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_AddNewDepartment(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_AddNewDepartment/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }


  GetProfileData_Dashboard(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_Dashboard/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_EditFile(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_EditFile/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_FileInitiation(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_FileInitiation/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_Filemovement(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_Filemovement/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  getDepartmentByRegistrationId(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getDepartmentByRegistrationId/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  getAllDepartmentByUserRoleAndRegistrationId(role, registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getDepartmentsByUserRole/' + role + '/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  getAssignedToUserAllEmployeesBasedOnRole(role, departmentid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAssignedToUserAllEmployeesBasedOnRole/' + role + '/' + departmentid)
      .pipe(catchError(this.formatErrors));
  }


  getAssignedToUser5Else(role, departmentid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAssignedToUser5Else/' + role + '/' + departmentid)
      .pipe(catchError(this.formatErrors));
  }


  registrarDepartment(): Observable<any> {
    return this.http.get(environment.hostUrl + 'registrarDepartment/')
      .pipe(catchError(this.formatErrors));
  }


  getAllDepartmentNew(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllDepartmentNew/')
      .pipe(catchError(this.formatErrors));
  }

  getAllDepartmentForHOD(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllDepartmentForHOD/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }


  getDepartmentEmailId(departmentid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getDepartmentEmailId/' + departmentid)
      .pipe(catchError(this.formatErrors));
  }

  getUserIdByREgistration(emailid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getUserIdByREgistration/' + emailid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_FileOnMyDesk(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_FileOnMyDesk/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_AdminNavbar(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_AdminNavbar/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_HodNavbar(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_HodNavbar/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_ShareNavbar(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_ShareNavbar/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_HodSidebar(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_HodSidebar/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_userSidebar(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_userSidebar/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_FileReceived(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_FileReceived/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  getfilecreationInfo(fileid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getfilecreationInfo/' + fileid)
      .pipe(catchError(this.formatErrors));
  }

  getfileInfo(fileid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getfileInfo/' + fileid)
      .pipe(catchError(this.formatErrors));
  }

  getAllUserOfDepartment(departmentid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllUserByDepartment/' + departmentid)
      .pipe(catchError(this.formatErrors));
  }


  getDepartmentName(departmentid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getDepartmentName/' + departmentid)
      .pipe(catchError(this.formatErrors));
  }


  getAllDesignation(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllDesignation/')
      .pipe(catchError(this.formatErrors));
  }



  getUserNameByUserId(userid) {
    return this.http.get(environment.hostUrl + 'getUserNameByUserId/' + userid).toPromise();

  }


  GetFileByDepartmentIdAndRegistrationId(departmentid, registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetFileByDepartmentIdAndRegistrationId/' + departmentid + '/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  getFilesForRecall(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getFilesForRecall/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  GetFileByDepartmentId(departmentid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getFileByDepartmentId/' + departmentid)
      .pipe(catchError(this.formatErrors));
  }
  checkForLeave(date, emp_id): any {
    return this.http.get(environment.hostUrl + 'checkForLeave/' + date + '/' + emp_id).toPromise();

  }


  GetFileBy_RegistrationId(Registration_id): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetFileBy_RegistrationId/' + Registration_id)
      .pipe(catchError(this.formatErrors));
  }


  getFileToBeReceivedByDepartmentId(departmentid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getFileToBeReceivedByDepartmentId/' + departmentid)
      .pipe(catchError(this.formatErrors));
  }

  getFileToBeReceivedByDepartmentId_ForfileReceived(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'getFileToBeReceivedByDepartmentId_ForfileReceived/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  postLatestCountOfFiles(count) {
    this.messageSource.next(count);
  }

  postLatestCountOfFileReceived(count) {
    this.messageSourceFileReceive.next(count);
  }

  GetFileByFileId(file_id): Observable<any> {
    return this.http.get(environment.hostUrl + 'getFileByFileId/' + file_id)
      .pipe(catchError(this.formatErrors));
  }

  GetAllDepartment(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllDepartment')
      .pipe(catchError(this.formatErrors));
  }

  GetAllDepartment_forManageHOD(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllDepartment_forManageHOD')
      .pipe(catchError(this.formatErrors));
  }

  GetAllDepartment_forUserMappingDepartment(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllDepartment_forUserMappingDepartment')
      .pipe(catchError(this.formatErrors));
  }

  GetAllDepartment_forEditProfie(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllDepartment_forEditProfie')
      .pipe(catchError(this.formatErrors));
  }

  GetAllDepartment_forAddDepartment(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllDepartment_forAddDepartment')
      .pipe(catchError(this.formatErrors));
  }

  GetAllCourierBoys(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllCourierBoys')
      .pipe(catchError(this.formatErrors));
  }

  GetAllUserByDepartment(DepartmentId): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllUserByDepartment/' + DepartmentId)
      .pipe(catchError(this.formatErrors));
  }



  GetAllGuestList(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getGuestList')
      .pipe(catchError(this.formatErrors));
  }

  GetAllGuestDetails(category): Observable<any> {
    return this.http.get(environment.hostUrl + 'getGuestListDetails/' + category)
      .pipe(catchError(this.formatErrors));
  }

  GetAllEmployeeProfileData_forManageHOD(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllEmployeeProfileData_forManageHOD')
      .pipe(catchError(this.formatErrors));
  }

  GetAllEmployeeProfileData(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllEmployeeProfileData')
      .pipe(catchError(this.formatErrors));
  }


  GetAllEmployeeProfileData_ForAddNewDepartment(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllEmployeeProfileData_ForAddNewDepartment')
      .pipe(catchError(this.formatErrors));
  }

  GetAllEmployeeProfileData_ForUserDepartmentMapping(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllEmployeeProfileData_ForUserDepartmentMapping')
      .pipe(catchError(this.formatErrors));
  }

  GetFileCount(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetFileCount')
      .pipe(catchError(this.formatErrors));
  }

  GetAllDesignation(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllDesignation')
      .pipe(catchError(this.formatErrors));
  }

  GetAllDesignation_forAddNewDepartment(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllDesignation_forAddNewDepartment')
      .pipe(catchError(this.formatErrors));
  }

  GetFileCategory(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetFileCategory')
      .pipe(catchError(this.formatErrors));
  }

  GetAllPriorities(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllPriorities')
      .pipe(catchError(this.formatErrors));
  }

  hod_check(registrationid: any): any {
    return this.http.get(environment.hostUrl + 'GetHodChecked/' + registrationid).toPromise();

  }

  GetAllEmployeeProfileData_WithDeptNameforManageUser(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllEmployeeProfileData_WithDeptNameforManageUser')
      .pipe(catchError(this.formatErrors));
  }

  GetAllEmployeeProfileData_WithDeptName(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllEmployeeProfileData_WithDeptName')
      .pipe(catchError(this.formatErrors));
  }

  tableName(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllTableNames/')
      .pipe(catchError(this.formatErrors));
  }

  getTableDataByTableName(tablename): Observable<any> {
    return this.http.get(environment.hostUrl + 'getTableData/' + tablename)
      .pipe(catchError(this.formatErrors));
  }

  getSuggestionsData(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getSuggestionsData')
      .pipe(catchError(this.formatErrors));
  }

  GetFileId(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetFileId')
      .pipe(catchError(this.formatErrors));
  }

  DeleteDepartment(DepartmentID: any): Observable<any> {
    return this.http.get(environment.hostUrl + 'DeleteDepartment/' + DepartmentID)
      .pipe(catchError(this.formatErrors));
  }

  GetProfileData_AddUser(registrationid): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetProfileData_AddUser/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  getHolidayData(): any {
    return this.http.get(environment.hostUrl + 'getHolidayData/')
      .pipe(catchError(this.formatErrors));
  }

  getLeaveInfo(emp_id): any {
    return this.http.get(environment.hostUrl + 'getLeaveInfo/' + emp_id)
      .pipe(catchError(this.formatErrors));
  }

  DeleteHoliday(id: any): Observable<any> {
    return this.http.get(environment.hostUrl + 'DeleteHoliday/' + id)
      .pipe(catchError(this.formatErrors));
  }

  GetFileIdBased_Department(file_id): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetFileIdBased_Department/' + file_id)
      .pipe(catchError(this.formatErrors));
  }


  getRegistrarDepartment(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getRegistrarDepartment')
      .pipe(catchError(this.formatErrors));
  }

  GetDepartmentBased_hodName(DepartmentId): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetDepartmentBased_hodName/' + DepartmentId)
      .pipe(catchError(this.formatErrors));
  }

  GetHodandRegistrarDepartment_ForHOD(DepartmentID: any): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetHodandRegistrarDepartment_ForHOD/' + DepartmentID)
      .pipe(catchError(this.formatErrors));
  }

  getAllDepartmentData_forMoveDepartment(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllDepartmentData_forMoveDepartment')
      .pipe(catchError(this.formatErrors));
  }


  GetAllUser_ByDepartment(DepartmentId): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllUser_ByDepartment/' + DepartmentId)
      .pipe(catchError(this.formatErrors));
  }

  GetDepartment_ForUser(Registration_id): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetDepartment_ForUser/' + Registration_id)
      .pipe(catchError(this.formatErrors));
  }

  GetFileCategory_ForManageCategory(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetFileCategory_ForManageCategory')
      .pipe(catchError(this.formatErrors));
  }

  DeleteCategory(categoryId: any, categoryName: any): Observable<any> {
    return this.http.get(environment.hostUrl + 'DeleteCategory/' + categoryId + '/' + categoryName)
      .pipe(catchError(this.formatErrors));
  }


  GetFileHoldingData(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetFileHoldingData/')
      .pipe(catchError(this.formatErrors));
  }

  getAllDepartment_ForManageFileHolidays(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllDepartment_ForManageFileHolidays')
      .pipe(catchError(this.formatErrors));
  }

  getFileHolidaysData(department_id: any): Observable<any> {
    return this.http.get(environment.hostUrl + 'getFileHolidaysData/' + department_id)
      .pipe(catchError(this.formatErrors));
  }

  getForgotPassword(email: any): Observable<any> {
    return this.http.get(environment.hostUrl + 'forgotpassword/' + email)
      .pipe(catchError(this.formatErrors));
  }

  GetAllEmployeePicture(registrationId: any): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetAllEmployeePicture/' + registrationId)
      .pipe(catchError(this.formatErrors));
  }

  getUserCredentials(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getUserCredentials/')
      .pipe(catchError(this.formatErrors));
  }

  GetDatewiseTotalFiles(): Observable<any> {
    return this.http.get(environment.hostUrl + 'GetDatewiseTotalFiles/')
      .pipe(catchError(this.formatErrors));
  }

  getDepartmentHOD_departmentIdBased(department_id: any): Observable<any> {
    return this.http.get(environment.hostUrl + 'getDepartmentHOD_departmentIdBased/' + department_id)
      .pipe(catchError(this.formatErrors));
  }

  getSuggestionID(): Observable<any> {
    return this.http.get(environment.hostUrl + 'getSuggestionID')
      .pipe(catchError(this.formatErrors));
  }

  getSuggestionDataIdBased(id): Observable<any> {
    return this.http.get(environment.hostUrl + 'getSuggestionDataIdBased/' + id)
      .pipe(catchError(this.formatErrors));
  }

  getFirstTimeCreate_FileData(registrationid: any): Observable<any> {
    return this.http.get(environment.hostUrl + 'getFirstTimeCreate_FileData/' + registrationid)
      .pipe(catchError(this.formatErrors));
  }

  FileDelete(fileId: any): Observable<any> {
    return this.http.get(environment.hostUrl + 'FileDelete/' + fileId)
      .pipe(catchError(this.formatErrors));
  }

  getAllFileCount() {
    return this.http.get(environment.hostUrl + 'getAllFileCount')
      .pipe(catchError(this.formatErrors))
  }

  getAllFileId_foraddAttachment(RegistrationId): Observable<any> {
    return this.http.get(environment.hostUrl + 'getAllFileId_foraddAttachment/' + RegistrationId)
      .pipe(catchError(this.formatErrors))
  }


  getAttachedFiles_RowIdAndFileIdBased(file_id: any, RowId: any): any {
    return this.http.get(environment.hostUrl + 'getAttachedFiles_RowIdAndFileIdBased/' + file_id + '/' + RowId)
    .pipe(catchError(this.formatErrors))
  }

  gettotalfiles_morethanholdingdays(registrationid: any, department: any):Observable<any> {
    return this.http.get(environment.hostUrl + 'gettotalfiles_morethanholdingdays/' + registrationid + '/' + department)
      .pipe(catchError(this.formatErrors))
  }


  getAssignedToUser4Else(departmentId: any):Observable<any> {
    return this.http.get(environment.hostUrl + 'getAssignedToUser4Else/' + departmentId)
    .pipe(catchError(this.formatErrors))
  }

  getReportData_Datewise(reportDate):Observable<any> {
    return this.http.post(environment.hostUrl + 'getReportData_Datewise/' , reportDate)
    .pipe(catchError(this.formatErrors));
  }

  getholdingfilesdatewisereport(reportDate):Observable<any> {
    return this.http.post(environment.hostUrl + 'getholdingfilesdatewisereport/' , reportDate)
    .pipe(catchError(this.formatErrors));
  }



  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
