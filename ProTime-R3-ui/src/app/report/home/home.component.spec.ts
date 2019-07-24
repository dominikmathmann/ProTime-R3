import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonModule } from 'primeng/button';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { TimeToHourPipe } from 'src/app/base/pipes/time-to-hour.pipe';
import { ProjectIdToNamePipe } from 'src/app/base/pipes/project-id-to-name.pipe';
import { ProjectSelectionComponent } from 'src/app/project/common/project-selection/project-selection.component';
import { CalendarModule } from 'primeng/calendar';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TableModule,
        HttpClientTestingModule,
        ButtonModule,
        DropdownModule,
        CalendarModule
      ],
      providers: [

      ],
      declarations: [
        HomeComponent,
        FilterFormComponent,
        TimeToHourPipe,
        ProjectIdToNamePipe,
        ProjectSelectionComponent,
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
