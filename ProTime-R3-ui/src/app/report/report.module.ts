import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FilterFormComponent } from './home/filter-form/filter-form.component';
import { HomeComponent } from './home/home.component';
import { ReportRoutingModule } from './report-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BaseModule } from '../base/base.module';
import { ProjectSelectionComponent } from '../project/common/project-selection/project-selection.component';
import { ProjectModule } from '../project/project.module';

@NgModule({
  declarations: [HomeComponent, FilterFormComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    BaseModule,
    ProjectModule
  ]
})
export class ReportModule {}
