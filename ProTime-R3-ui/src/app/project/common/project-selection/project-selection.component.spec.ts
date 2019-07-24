import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSelectionComponent } from './project-selection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectSelectionComponent', () => {
  let component: ProjectSelectionComponent;
  let fixture: ComponentFixture<ProjectSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DropdownModule,
        HttpClientTestingModule
      ],
      providers: [

      ],
      declarations: [ProjectSelectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
