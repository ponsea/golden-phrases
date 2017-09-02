import { Component,
         Input,
         Output,
         EventEmitter,
         HostListener } from '@angular/core';

import { Phrase } from '../../core/phrase';

@Component({
  selector: 'gp-phrases-viewer',
  templateUrl: './phrases-viewer.component.html',
  styleUrls: ['./phrases-viewer.component.scss']
})
export class PhrasesViewerComponent {
  @Input() index? = 0;
  @Input() phrases: Phrase[];
  @Output() indexChange = new EventEmitter<number>();

  constructor() { }

  get currentPhrase() { return this.phrases[this.index]; }

  next() {
    if (this.index < this.phrases.length - 1) {
      this.indexChange.emit(++this.index);
    }
  }

  prev() {
    if (this.index > 0) {
      this.indexChange.emit(--this.index);
    }
  }

  @HostListener('document:keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent): void {
    const KEY_LEFT = 37, KEY_RIGHT = 39;
    if (event.keyCode === KEY_LEFT) this.prev();
    if (event.keyCode === KEY_RIGHT) this.next();
  }
}
