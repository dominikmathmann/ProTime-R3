import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordInputComponent } from './record-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectSelectionComponent } from 'src/app/project/common/project-selection/project-selection.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

describe('RecordInputComponent', () => {
  let component: RecordInputComponent;
  let fixture: ComponentFixture<RecordInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        CalendarModule,
        DropdownModule
      ],
      declarations: [
        RecordInputComponent,
        ProjectSelectionComponent
      ],
      providers: [

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
