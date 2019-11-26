import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpDateInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' || req.method === 'PUT') {
      for (let attr in req.body) {
        if (req.body[attr] instanceof Date) {
          req.body[attr] = formatDate(req.body[attr], "dd.MM.yyyy'T'HH:mm", 'en');
        }
      }
    }

    return next.handle(req).pipe(
      tap(r => {
        if (r instanceof HttpResponse) {
          const body = r.body;
          if (body instanceof Array) this.convertArrayObjectAttributesToDate(body);
          else if (body) this.convertObectAttributesToDate(body);
        }
      })
    );
  }

  convertArrayObjectAttributesToDate(arr: any) {
    arr.forEach(e => this.convertObectAttributesToDate(e));
  }

  convertObectAttributesToDate(obj: any) {
    const regex = /(\d{2}).(\d{2}).(\d{4})T(\d{2}):(\d{2})/;
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (regex.test(value)) {
        const grps = regex.exec(value);

        const [all, date, month, year, hour, minute] = grps;
        obj[key] = new Date(Number(year), Number(month) - 1, Number(date), Number(hour), Number(minute));
      }
    }
  }
}
