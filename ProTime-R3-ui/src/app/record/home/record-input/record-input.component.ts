import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/base/services/project.service';
import { RecordService } from 'src/app/base/services/record.service';
import { SelectRecordEvent } from 'src/app/ProTime-R3-models';
import { Project, Record } from 'src/app/api';

@Component({
  selector: 'pt3-record-input',
  templateUrl: './record-input.component.html',
  styleUrls: ['./record-input.component.scss']
})
export class RecordInputComponent implements OnChanges {
  @Input()
  recordEvent: SelectRecordEvent = {} as SelectRecordEvent;

  @Output()
  saved = new EventEmitter<Record>();

  @Output()
  cancelled = new EventEmitter<Record>();

  @ViewChild('descriptionInput', { static: true })
  descriptionInput: ElementRef;

  projects: Project[];

  form: FormGroup;

  @HostListener('window:beforeunload', ['$event'])
  beforeunload($event) {
    if (!this.form.controls.id.value && this.form.controls.start.value) {
      //unsaved record. Save.
      this.form.controls.end.setValue(new Date());

      this.save();
    }
  }

  constructor(private recordService: RecordService, private projectService: ProjectService, builder: FormBuilder) {
    projectService.getAll().subscribe(r => {
      this.projects = r;
    });

    this.form = builder.group({
      id: [''],
      start: [''],
      end: [''],
      project: [''],
      description: [''],
      journeyTime: [false]
    });
  }

  ngOnChanges() {
    const oldProjectSelections = this.form.controls.project.value;
    this.form.reset();

    if (this.recordEvent) {
      this.form.patchValue(this.recordEvent.record);
    } else {
      this.form.patchValue({ project: oldProjectSelections });
    }

    this.descriptionInput.nativeElement.focus();
    this.descriptionInput.nativeElement.select();
  }

  setNow(target: AbstractControl) {
    target.setValue(new Date());
  }

  save() {

    if (!this.form.value.start && !this.form.value.end) {
      this.form.patchValue(
        {
          start: new Date(),
          end: new Date()
        }
      );
    }

    this.recordService.save(this.form.value).subscribe(r => {
      this.recordEvent = null;
      this.ngOnChanges();
      this.saved.emit(r);
    });
  }

  cancel() {
    this.recordEvent = null;
    this.ngOnChanges();
    this.cancelled.emit(null);
  }

  onDriveTimeChange() {
    if (this.form.controls.journeyTime.value) this.form.patchValue({ description: 'Fahrzeit' });
  }
}
