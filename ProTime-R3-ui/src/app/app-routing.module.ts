import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardService } from './base/services/login-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [LoginGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'record', loadChildren: () => import('./record/record.module').then(m => m.RecordModule), canActivate: [LoginGuardService] },
  { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule), canActivate: [LoginGuardService] },
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule), canActivate: [LoginGuardService] },
  { path: 'notes', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule), canActivate: [LoginGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
