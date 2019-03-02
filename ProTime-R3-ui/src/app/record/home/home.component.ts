import { Component, OnInit, ViewChild } from '@angular/core';
import { Record } from 'src/app/ProTime-R3-backend';
import { RecordTableComponent } from './record-table/record-table.component';
import { SelectRecordEvent } from 'src/app/ProTime-R3-models';

@Component({
  selector: 'pt3-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedRecord: SelectRecordEvent;

  @ViewChild(RecordTableComponent)
  recordTable: RecordTableComponent;

  constructor() {}

  ngOnInit() {}

  updateTable(record: Record) {
    const existingEntryIndex = this.recordTable.records.findIndex(e => e.id === record.id);
    if (existingEntryIndex !== -1) {
      this.recordTable.records[existingEntryIndex] = record;
    } else {
      this.recordTable.records.unshift(record);
    }
  }
}
