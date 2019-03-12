import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pt3-local-storage-text-area',
  templateUrl: './local-storage-text-area.component.html',
  styleUrls: ['./local-storage-text-area.component.scss']
})
export class LocalStorageTextAreaComponent implements OnInit, OnDestroy {
  public static readonly LSPREFIX = 'PT3-LST';

  @Input()
  id = '';

  form: FormGroup;

  txtChanged: Subscription;

  constructor(formBuilder: FormBuilder) {
    const content = localStorage.getItem(this.getKey());
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

  private getKey(): string {
    return LocalStorageTextAreaComponent.LSPREFIX + this.id;
  }

  private save() {
    localStorage.setItem(this.getKey(), this.form.controls.txtinput.value);
  }
}
