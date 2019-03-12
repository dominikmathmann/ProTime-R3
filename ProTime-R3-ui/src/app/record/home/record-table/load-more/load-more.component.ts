import { Component, OnInit, Output, EventEmitter, Input, HostListener, OnChanges } from '@angular/core';
import { Observable, fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pt3-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit, OnChanges {
  @Input()
  first = 0;

  @Input()
  itemsPerPage: number;

  @Input()
  loadDoneSubject: Subject<any>;

  @Output()
  loadTrigger = new EventEmitter<any>();

  loadingActive = true;

  private scrollSubscription: Subscription;

  ngOnInit() {
    this.emitCurrentValues();
  }

  constructor() {}

  ngOnChanges() {
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();

    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(debounceTime(200))
      .subscribe(e => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
          this.onClick();
        }
      });

    if (this.loadDoneSubject) {
      this.loadDoneSubject.subscribe(e => {
        this.loadingActive = false;
      });
    }
  }

  onClick() {
    console.log('load some more...');
    this.loadingActive = true;
    this.first += this.itemsPerPage;
    this.emitCurrentValues();
  }

  private emitCurrentValues() {
    this.loadTrigger.emit({
      limit: this.itemsPerPage,
      first: this.first
    });
  }
}
