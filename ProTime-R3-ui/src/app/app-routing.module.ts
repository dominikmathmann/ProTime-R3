import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardService } from './base/services/login-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [LoginGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'record', loadChildren: './record/record.module#RecordModule', canActivate: [LoginGuardService] },
  { path: 'project', loadChildren: './project/project.module#ProjectModule', canActivate: [LoginGuardService] },
  { path: 'report', loadChildren: './report/report.module#ReportModule', canActivate: [LoginGuardService] },
  { path: 'notes', loadChildren: './notes/notes.module#NotesModule', canActivate: [LoginGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
