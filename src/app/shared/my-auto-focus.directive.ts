import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[myAutoFocus]'
})
export class MyAutoFocusDirective implements OnInit{

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.element.nativeElement.focus();
  }
}
