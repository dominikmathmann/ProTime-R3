import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStorageTextAreaComponent } from './local-storage-text-area.component';

describe('LocalStorageTextAreaComponent', () => {
  let component: LocalStorageTextAreaComponent;
  let fixture: ComponentFixture<LocalStorageTextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalStorageTextAreaComponent ]
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
