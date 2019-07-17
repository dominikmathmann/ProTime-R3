import { Injectable } from '@angular/core';
import { Record } from 'src/app/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultService } from 'src/app/api';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private service: DefaultService) { }

  save(record: Record): Observable<Record> {
    if (record.id) {
      return this.service.put2(record.id, record);
    } else {
      return this.service.post1(record);
    }
  }

  getAll(limit?: number, first?: number): Observable<Record[]> {
    return this.service.getAll1(limit, first);
  }
}
