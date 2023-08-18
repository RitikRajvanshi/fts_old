import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DeptInfoComponent } from './dept-info/dept-info.component';
import { StaffInfoComponent } from './staff-info/staff-info.component';
import { TrainingVideoComponent } from './share/training-video/training-video.component';
import { HelpComponent } from './share/help/help.component';



const routes: Routes = [

  { path: '', loadChildren: './login/login.module#LoginModule', pathMatch: 'full' },

  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'dept-info', component: DeptInfoComponent },
  { path: 'staff-info', component: StaffInfoComponent },
  { path: 'training-video', component: TrainingVideoComponent },
  { path: 'help', component: HelpComponent },

  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
 
  { path: '**', loadChildren: './login/login.module#LoginModule', pathMatch: 'full' },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules,useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
