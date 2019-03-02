import { Injectable } from '@angular/core';
import { IntegerIdEntity } from '../../ProTime-R3-backend';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonHTTPServiceService<T extends IntegerIdEntity> {
  abstract readonly PATH: string;

  constructor(private http: HttpClient) {}

  public save(p: T): Observable<T> {
    let obs: Observable<T>;
    if (p.id) {
      obs = this.http.put<T>(`${environment.baseurl}${this.PATH}/${p.id}`, p);
    } else {
      obs = this.http.post<T>(`${environment.baseurl}${this.PATH}`, p);
    }

    return obs;
  }

  getAll(limit?: number): Observable<T[]> {
    const params = new HttpParams();

    if (limit) {
      params.set('limit', limit.toString());
    }

    return this.http.get<T[]>(environment.baseurl + this.PATH);
  }
}
