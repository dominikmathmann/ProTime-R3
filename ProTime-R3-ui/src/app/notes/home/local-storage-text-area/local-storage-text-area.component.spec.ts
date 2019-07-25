import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { LocalStorageTextAreaComponent } from './local-storage-text-area.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPreferencesService } from 'src/app/base/services/user-preferences.service';

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

  let spyOnGetNotes;

  beforeEach(() => {
    const uService = TestBed.get(UserPreferencesService);
    spyOnGetNotes = spyOn(uService, 'getNotes').and.returnValue('');
    fixture = TestBed.createComponent(LocalStorageTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init data with service', () => {
    expect(spyOnGetNotes).toHaveBeenCalledTimes(1);
  });

  it('should trigger update on change', () => {
    const spyOnSave = spyOn(component, 'save').and.returnValue('');
    const element: HTMLElement = fixture.nativeElement;
    const textarea = element.querySelector('textarea');
    textarea.value = 'Test';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spyOnSave).toHaveBeenCalledTimes(1);
    });
  });
});
