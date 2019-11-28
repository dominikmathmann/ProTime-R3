import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTableComponent } from './record-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProjectIdToNamePipe } from 'src/app/base/pipes/project-id-to-name.pipe';
import { TimeToHourPipe } from 'src/app/base/pipes/time-to-hour.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs'
import { BaseModule } from 'src/app/base/base.module';
import { LoadOnScrollDirective } from 'src/app/base/directives/load-on-scroll.directive';

describe('RecordTableComponent', () => {
  let component: RecordTableComponent;
  let fixture: ComponentFixture<RecordTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        TableModule,
        HttpClientTestingModule
      ],
      declarations: [
        RecordTableComponent,
        ProjectIdToNamePipe,
        TimeToHourPipe,
        LoadOnScrollDirective
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

  it('should emit selections', () => {
    component.record = { id: 100 };
    spyOn(component.select, 'emit');
    component.onselect();
    expect(component.select.emit).toHaveBeenCalledWith({ record: component.record });
  });

  it('should copy wihtout id', () => {
    const reco = { id: 100 };
    spyOn(component.select, 'emit');
    component.copy(reco);
    expect(component.select.emit).toHaveBeenCalledWith({ record: { id: null }, copy: true });
  });

  it('should show load-data sign', () => {
    spyOn(component['service'], 'getAll').and.returnValue(of([{}]));
    component.loadData({ limit: 100, first: 0 });
    expect(component['service'].getAll).toHaveBeenCalled();
    expect(component.records.length).toBe(1);
    component.loadData({ limit: 100, first: 0 });
    expect(component['service'].getAll).toHaveBeenCalledTimes(2);
    expect(component.records.length).toBe(2);
  });
});
