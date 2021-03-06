import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpDateInterceptorService } from './services/http-date-interceptor.service';
import { ProjectService } from './services/project.service';
import { RecordService } from './services/record.service';
import { TimeToHourPipe } from './pipes/time-to-hour.pipe';
import { HttpJwtInterceptorService } from './services/http-jwt-interceptor.service';
import { ToastModule } from 'primeng/toast';
import { ProjectIdToNamePipe } from './pipes/project-id-to-name.pipe';
import { LoadOnScrollDirective } from './directives/load-on-scroll.directive';

@NgModule({
  declarations: [TimeToHourPipe, ProjectIdToNamePipe, LoadOnScrollDirective],
  imports: [CommonModule, ToastModule],
  exports: [TimeToHourPipe, ProjectIdToNamePipe, LoadOnScrollDirective]
})
export class BaseModule { }
