import { Component, OnInit, forwardRef, ViewChild, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/base/services/project.service';
import { Dropdown } from 'primeng/dropdown';
import { Project, Record } from 'src/app/api';

@Component({
  selector: 'pt3-project-selection',
  templateUrl: './project-selection.component.html',
  styleUrls: ['./project-selection.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectSelectionComponent),
      multi: true
    }
  ]
})
export class ProjectSelectionComponent implements ControlValueAccessor {
  projects: Project[];

  form: FormGroup;

  @Input()
  records: Record[];

  constructor(private service: ProjectService, builder: FormBuilder) {
    service.getAll().subscribe(r => (this.projects = [{ id: null } as Project].concat(r)));

    this.form = builder.group({
      value: ['']
    });

    this.form.controls.value.valueChanges.subscribe(c => {
      this.onChange(c.id);
    });
  }

  writeValue(obj: number): void {
    if (obj) {
      const current = this.projects.find(e => e.id === obj);
      if (current) this.form.patchValue({ value: current });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  onChange: any = () => { };

  onTouched: any = () => { };
}
