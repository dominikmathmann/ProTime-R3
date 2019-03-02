import { Injectable } from '@angular/core';
import { CommonHTTPServiceService } from './common-httpservice.service';
import { Record } from '../../ProTime-R3-backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService extends CommonHTTPServiceService<Record> {
  PATH = 'record';

  constructor(http: HttpClient) {
    super(http);
  }
}
