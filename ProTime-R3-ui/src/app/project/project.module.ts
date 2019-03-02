import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TableModule } from 'primeng/table';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectSelectionComponent } from './common/project-selection/project-selection.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [HomeComponent, ProjectSelectionComponent],
  imports: [ProjectRoutingModule, CommonModule, TableModule, ReactiveFormsModule, DropdownModule],
  exports: [ProjectSelectionComponent]
})
export class ProjectModule {}
