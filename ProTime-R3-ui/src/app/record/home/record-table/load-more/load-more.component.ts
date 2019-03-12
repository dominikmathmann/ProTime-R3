import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pt3-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {
  @Input()
  first: number = 0;

  @Input()
  itemsPerPage: number;

  @Output()
  loadTrigger = new EventEmitter<any>();

  ngOnInit() {
    this.emitCurrentValues();
  }

  constructor() {
    fromEvent(window, 'scroll')
      .pipe(debounceTime(200))
      .subscribe(e => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
          this.onClick();
        }
      });
  }

  onClick() {
    console.log('load some more...');

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
