import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RecordInputComponent } from './record-input/record-input.component';
import { RecordTableComponent } from './record-table/record-table.component';
import { ProjectSelectionComponent } from 'src/app/project/common/project-selection/project-selection.component';
import { CalendarModule } from 'primeng/calendar';
import { ProjectIdToNamePipe } from 'src/app/base/pipes/project-id-to-name.pipe';
import { TimeToHourPipe } from 'src/app/base/pipes/time-to-hour.pipe';
import { ButtonModule } from 'primeng/button';
import { LoadOnScrollModule } from 'load-on-scroll';
import { DropdownModule } from 'primeng/dropdown';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TableModule,
        HttpClientTestingModule,
        InputSwitchModule,
        CalendarModule,
        ButtonModule,
        DropdownModule,
        LoadOnScrollModule
      ],
      providers: [

      ],
      declarations: [HomeComponent,
        RecordInputComponent,
        RecordTableComponent,
        ProjectSelectionComponent,
        ProjectIdToNamePipe,
        TimeToHourPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
