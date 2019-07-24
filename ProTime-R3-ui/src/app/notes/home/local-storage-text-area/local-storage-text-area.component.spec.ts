import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStorageTextAreaComponent } from './local-storage-text-area.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LocalStorageTextAreaComponent', () => {
  let component: LocalStorageTextAreaComponent;
  let fixture: ComponentFixture<LocalStorageTextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [

      ],
      declarations: [LocalStorageTextAreaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalStorageTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
