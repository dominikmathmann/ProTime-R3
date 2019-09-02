import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordInputComponent } from './record-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectSelectionComponent } from 'src/app/project/common/project-selection/project-selection.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { RecordService } from 'src/app/base/services/record.service';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/base/services/project.service';
import { UserPreferencesService } from 'src/app/base/services/user-preferences.service';
import { DefaultService, Record } from 'src/app/api';

describe('RecordInputComponent', () => {
  let component: RecordInputComponent;
  let fixture: ComponentFixture<RecordInputComponent>;
  const projectService = { getAll: () => { } };
  const recordService = { save: () => { } };
  let getAllServicesSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CalendarModule,
        DropdownModule,
        HttpClientTestingModule
      ],
      declarations: [

        RecordInputComponent,
        ProjectSelectionComponent
      ],
      providers: [
        { provide: UserPreferencesService, useValue: {} },
        { provide: RecordService, useValue: recordService },
        { provide: ProjectService, useValue: projectService },
        { provide: DefaultService, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const service = TestBed.get(ProjectService);
    getAllServicesSpy = spyOn(service, 'getAll').and.returnValue(of([{}, {}]));

    fixture = TestBed.createComponent(RecordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load test data', () => {
    const service = TestBed.get(ProjectService);
    fixture = TestBed.createComponent(RecordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(getAllServicesSpy).toHaveBeenCalled();
    expect(component.projects.length).toBe(2);
  });


  it('should trigger change events', () => {
    component.recordEvent = { record: { id: 200 } };
    component.ngOnChanges();
    expect(component.form.get('id').value).toBe(200);
  });

  it('close should save', () => {
    const emitSpy = spyOn(component.saved, 'emit');

    const saveSpy = spyOn(component['recordService'], 'save').and.returnValue(of({ id: 100 }));

    component.form.get('id').setValue(null);
    component.form.get('start').setValue(new Date());

    component.beforeunload(null);
    expect(saveSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith({ id: 100 });

  });

  it('close shouldn save with active record', () => {
    const emitSpy = spyOn(component.saved, 'emit');
    const saveSpy = spyOn(recordService, 'save').and.returnValue(of({ id: 100 }));

    component.form.get('id').setValue(100);
    component.form.get('start').setValue(new Date());

    component.beforeunload(null);
    expect(saveSpy).not.toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();

  });

  it('cancel should clear', () => {
    const emitSpy = spyOn(component.cancelled, 'emit');

    component.recordEvent = { record: { id: 200 } };
    component.cancel();

    expect(emitSpy).toHaveBeenCalled();
    expect(component.recordEvent).toBeFalsy();

  });


  it('save should set date if not set', () => {
    const saveSpy = spyOn(component['recordService'], 'save').and.callFake((p: Record) => {
      expect(p.start).toBeTruthy();
      expect(p.end).toBeTruthy();
      expect(p.start).toEqual(p.end);
      return of(p);
    });

    component.save();

  });
});
