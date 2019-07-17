import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserPreferencesService } from 'src/app/base/services/user-preferences.service';

@Component({
  selector: 'pt3-local-storage-text-area',
  templateUrl: './local-storage-text-area.component.html',
  styleUrls: ['./local-storage-text-area.component.scss']
})
export class LocalStorageTextAreaComponent implements OnInit, OnDestroy {
  @Input()
  id = '';

  form: FormGroup;

  txtChanged: Subscription;

  constructor(formBuilder: FormBuilder, private uService: UserPreferencesService) {
    const content = uService.getNotes(this.id);
    this.form = formBuilder.group({
      txtinput: [content]
    });

    this.txtChanged = this.form.controls.txtinput.valueChanges.pipe(debounceTime(1000)).subscribe(e => this.save());
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.txtChanged.unsubscribe();
    this.save();
  }

  private save() {
    this.uService.setNotes(this.id, this.form.controls.txtinput.value);
  }
}
