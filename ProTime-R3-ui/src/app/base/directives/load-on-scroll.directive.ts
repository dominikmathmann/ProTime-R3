import { Directive, Input, Output, EventEmitter, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[pt3LoadOnScroll]'
})
export class LoadOnScrollDirective {
  @Input()
  first: number = 0;

  @Input()
  itemsPerPage: number;

  @Input()
  loadDoneSubject: Subject<any>;

  @Input()
  rotateOnLoadChildSelector: string;

  @Input()
  rotateOnLoad = false;

  @Input()
  disableOnLoad = false;

  @Input()
  bottomPixelBorder = 25;

  @Output()
  loadTrigger = new EventEmitter<any>();

  private scrollSubscription: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.setOnLoad(true);
    this.emitCurrentValues();
  }

  ngOnChanges() {
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();

    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(debounceTime(200))
      .subscribe(e => {
        if (window.scrollY + window.innerHeight + this.bottomPixelBorder >= document.body.scrollHeight) {
          this.onClick();
        }
      });

    if (this.loadDoneSubject) {
      this.loadDoneSubject.subscribe(e => {
        this.setOnLoad(false);
      });
    }
  }

  @HostListener('click')
  onClick() {
    this.setOnLoad(true);
    this.first += this.itemsPerPage;
    this.emitCurrentValues();
  }

  private emitCurrentValues() {
    this.loadTrigger.emit({
      limit: this.itemsPerPage,
      first: this.first
    });
  }

  private setOnLoad(load: boolean) {
    if (this.disableOnLoad) this.disable(load);
    if (this.rotateOnLoad) this.rotate(load);
  }

  private rotate(on: boolean) {
    const componentToRotate = this.rotateOnLoadChildSelector
      ? this.el.nativeElement.querySelector(this.rotateOnLoadChildSelector)
      : this.el.nativeElement;

    if (on) this.renderer.addClass(componentToRotate, 'los-rotate');
    else this.renderer.removeClass(componentToRotate, 'los-rotate');
  }

  private disable(on: boolean) {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', on);
  }
}
