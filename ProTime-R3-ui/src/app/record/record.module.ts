import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { BaseModule } from '../base/base.module';
import { ProjectModule } from '../project/project.module';
import { HomeComponent } from './home/home.component';
import { RecordInputComponent } from './home/record-input/record-input.component';
import { RecordTableComponent } from './home/record-table/record-table.component';
import { RecordRoutingModule } from './record-routing.module';

@NgModule({
  declarations: [HomeComponent, RecordInputComponent, RecordTableComponent],
  imports: [
    CommonModule,
    RecordRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    BaseModule,
    ProjectModule
  ]
})
export class RecordModule {}
