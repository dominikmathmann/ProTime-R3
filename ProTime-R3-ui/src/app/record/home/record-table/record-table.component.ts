import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from 'src/app/ProTime-R3-backend';
import { RecordService } from 'src/app/base/services/record.service';
import { SelectRecordEvent } from 'src/app/ProTime-R3-models';

@Component({
  selector: 'pt3-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.scss']
})
export class RecordTableComponent implements OnInit {
  records: Record[];

  record: Record;

  @Output()
  select = new EventEmitter<SelectRecordEvent>();

  constructor(private service: RecordService) {}

  ngOnInit() {}

  onselect() {
    this.select.emit({ record: this.record });
  }

  copy(record: Record) {
    this.select.emit({ record: { ...record, id: null }, copy: true });
  }

  loadData(loadEvent: any) {
    this.service.getAll(loadEvent.limit, loadEvent.first).subscribe(r => {
      if (!this.records) this.records = r;
      else this.records.push(...r);
    });
  }
}
