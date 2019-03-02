import { Injectable } from '@angular/core';
import { CommonHTTPServiceService } from './common-httpservice.service';
import { Project } from '../../ProTime-R3-backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends CommonHTTPServiceService<Project> {
  PATH = 'project';

  private projects: Project[];

  constructor(http: HttpClient) {
    super(http);
  }

  public save(p: Project): Observable<Project> {
    this.projects = null;
    return super.save(p);
  }

  getAll(limit?: number): Observable<Project[]> {
    if (!this.projects) {
      return super.getAll(limit).pipe(tap(r => (this.projects = r)));
    } else {
      return from([this.projects]);
    }
  }
}
