import { Injectable } from '@angular/core';
import { Project, DefaultService } from 'src/app/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[];

  constructor(private service: DefaultService) {
  }

  public save(p: Project): Observable<Project> {
    this.projects = null;
    if (p.id) {
      return this.service.put(p.id, p);
    } else {
      return this.service.post(p);
    }
  }

  getAll(limit?: number): Observable<Project[]> {
    if (!this.projects) {
      return this.service.getAll(limit).pipe(tap(r => (this.projects = r)));
    } else {
      return from([this.projects]);
    }
  }
}
