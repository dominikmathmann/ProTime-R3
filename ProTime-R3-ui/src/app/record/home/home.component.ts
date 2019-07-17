import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { RecordTableComponent } from './record-table/record-table.component';
import { SelectRecordEvent } from 'src/app/ProTime-R3-models';
import { RecordInputComponent } from './record-input/record-input.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserPreferencesService } from 'src/app/base/services/user-preferences.service';
import { RecordService } from 'src/app/base/services/record.service';
import { ProjectService } from 'src/app/base/services/project.service';
import { ProjectIdToNamePipe } from 'src/app/base/pipes/project-id-to-name.pipe';
import { Record } from 'src/app/api';

@Component({
  selector: 'pt3-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProjectIdToNamePipe]
})
export class HomeComponent {
  selectedRecord: SelectRecordEvent;

  @ViewChild(RecordTableComponent)
  recordTable: RecordTableComponent;

  @ViewChild(RecordInputComponent)
  recordInput: RecordInputComponent;

  simpleMode = false;

  form: FormGroup;

  lastRecordSummary: string;

  constructor(
    private fb: FormBuilder,
    private uService: UserPreferencesService,
    private recordService: RecordService,
    private projectIdToName: ProjectIdToNamePipe
  ) {
    this.simpleMode = uService.getSimpleRecordInputMode();
  }

  ngOnInit() {
    this.form = this.fb.group({
      simpleMode: [this.simpleMode]
    });

    this.form.controls.simpleMode.valueChanges.subscribe(e => {
      this.simpleMode = e;
      this.uService.setSimpleRecordInputMode(e);
    });

    this.recordService.getAll(1, 0).subscribe(r => this.updateLastRecordInfo(r[0]));
  }

  updateTable(record: Record) {
    const existingEntryIndex = this.recordTable.records.findIndex(e => e.id === record.id);
    if (existingEntryIndex !== -1) {
      this.recordTable.records[existingEntryIndex] = record;
    } else {
      this.recordTable.records.unshift(record);
    }

    const lastRecord = this.recordTable.records[0];
    this.updateLastRecordInfo(lastRecord);
  }

  updateLastRecordInfo(lastRecord: Record) {
    this.projectIdToName
      .transform(lastRecord.project)
      .subscribe(projectname => (this.lastRecordSummary = projectname + ' - ' + lastRecord.description));
  }

  pauseAllowed() {
    if (!this.recordTable.records) return false;
    if (this.recordTable.records.length === 0) return false;
    const record = this.recordTable.records[0];
    return record.duration === 0;
  }

  pause() {
    if (this.pauseAllowed()) {
      const record = Object.assign({}, this.recordTable.records[0]);
      record.end = new Date();
      this.recordService.save(record).subscribe(r => {
        this.updateTable(r);
      });
    }
  }

  continue() {
    const record = Object.assign({}, this.recordTable.records[0]);
    record.id = null;
    record.start = new Date();
    record.end = new Date();
    this.recordService.save(record).subscribe(r => {
      this.updateTable(r);
    });
  }

  selectRecord(record: SelectRecordEvent) {
    this.selectedRecord = record;
  }
}
