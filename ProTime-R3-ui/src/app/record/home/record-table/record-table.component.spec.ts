import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTableComponent } from './record-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProjectIdToNamePipe } from 'src/app/base/pipes/project-id-to-name.pipe';
import { TimeToHourPipe } from 'src/app/base/pipes/time-to-hour.pipe';
import { LoadOnScrollModule } from 'load-on-scroll';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecordTableComponent', () => {
  let component: RecordTableComponent;
  let fixture: ComponentFixture<RecordTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        TableModule,
        LoadOnScrollModule,
        HttpClientTestingModule
      ],
      declarations: [
        RecordTableComponent,
        ProjectIdToNamePipe,
        TimeToHourPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
