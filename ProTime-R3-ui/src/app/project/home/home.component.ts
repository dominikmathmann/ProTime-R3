import { Component, OnInit, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/base/services/project.service';
import { Project } from 'src/app/api';

@Component({
  selector: 'pt3-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  projects: Project[];

  project: Project = {} as Project;

  form: FormGroup;

  @ViewChild('inProjectId', { static: false })
  inProjectId: ElementRef;

  constructor(private service: ProjectService, builder: FormBuilder) {
    this.service.getAll().subscribe(r => (this.projects = r));
    this.form = builder.group({
      projectId: [''],
      projectName: ['']
    });
  }

  ngAfterViewInit() {
    this.project = {} as Project;
    this.edit();
  }

  edit() {
    this.inProjectId.nativeElement.focus();
    this.inProjectId.nativeElement.select();
    this.form.reset();
    this.form.patchValue(this.project);
  }

  submit() {
    Object.assign(this.project, this.form.value);

    this.service.save(this.project).subscribe(r => {
      if (!this.project.id) {
        this.projects.push(r);
        this.ngAfterViewInit();
      } else {
        this.ngAfterViewInit();
      }
    });
  }
}
