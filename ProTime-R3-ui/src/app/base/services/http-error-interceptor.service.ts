import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/components/common/messageservice';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private messageService: MessageService, private loginService: LoginService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 401) {
          // invalid token
          this.loginService.logout().subscribe(r => {
            console.log('automatic log off due to invalid token');
            this.router.navigateByUrl('login');
          });
        }

        this.messageService.add({
          severity: 'error',
          summary: 'HTTP-Request failed',
          detail: e.message,
          sticky: false,
          closable: true,
          life: 6000
        });
        return throwError(e.message);
      })
    );
  }
}
