import { Directive, Input, ElementRef, HostListener, Renderer2, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
@Directive({
  selector: '[vloading]'
})
export class LoadingDirective implements OnInit, OnChanges {
  _vloading: any = false;
  divLoading: HTMLElement;
  divLoad = `<div class="sk-circle-sm">
      <div class="sk-circle1 sk-child"></div>
      <div class="sk-circle2 sk-child"></div>
      <div class="sk-circle3 sk-child"></div>
      <div class="sk-circle4 sk-child"></div>
      <div class="sk-circle5 sk-child"></div>
      <div class="sk-circle6 sk-child"></div>
      <div class="sk-circle7 sk-child"></div>
      <div class="sk-circle8 sk-child"></div>
      <div class="sk-circle9 sk-child"></div>
      <div class="sk-circle10 sk-child"></div>
      <div class="sk-circle11 sk-child"></div>
      <div class="sk-circle12 sk-child"></div>
    </div>`;
    @Input() set vloading(value) {
    this._vloading = value;
    if (this._vloading) {
      this.divLoading = this.render.createElement('div');
      setTimeout(() => {
        const divSpin = this.render.createElement('div');
        divSpin.innerHTML = this.divLoad;
        this.render.addClass(divSpin, 'v-loader');
        this.render.appendChild(this.divLoading, divSpin);
        this.el.nativeElement.style.position = 'relative';
        this.divLoading.style.width = '100%';
        this.divLoading.style.height = '100%';
        this.render.addClass(this.divLoading, 'v-loading');
        this.render.appendChild(this.el.nativeElement, this.divLoading);
      });
    } else if (this.divLoading) {
      this.render.removeChild(this.el.nativeElement, this.divLoading);
      this.el.nativeElement.style.position = null;
      this.divLoading = null;
    }
  }
  constructor(
    private el: ElementRef,
    private render: Renderer2,
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit(): void {
  }
  onFocus() {
  }
  @HostListener('focusout')
  onFocusout() {
  }
}
