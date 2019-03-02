import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from 'src/app/ProTime-R3-backend';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) {}

  currentReport: Report;

  getReport(from: Date, to: Date, project?: string, search?: string, includeDrive?: boolean): Observable<Report> {
    return this.generateReport(
      { accept: 'application/json', type: 'json' },
      from,
      to,
      project,
      search,
      includeDrive
    ).pipe(tap(r => (this.currentReport = r)));
  }

  exportReport(from: Date, to: Date, project?: string, search?: string, includeDrive?: boolean): Observable<Report> {
    return this.generateReport({ accept: 'application/csv', type: 'blob' }, from, to, project, search, includeDrive);
  }

  private generateReport(
    httpConfig: { accept: string; type: string },
    from: Date,
    to: Date,
    project?: string,
    search?: string,
    includeDrive?: boolean
  ): Observable<Report> {
    const params: any = {};

    if (project) params.projectid = project.toString();
    if (search) params.search = search;
    if (includeDrive) params.includeDrive = includeDrive.toString();

    const fromAsPath = formatDate(from, 'dd.MM.yyyy', 'en');
    const toAsPath = formatDate(to, 'dd.MM.yyyy', 'en');

    return this.http.get<Report>(`${environment.baseurl}report/${fromAsPath}/${toAsPath}`, {
      params: new HttpParams({ fromObject: params }),
      headers: { Accept: httpConfig.accept },
      responseType: httpConfig.type as 'json'
    });
  }
}
