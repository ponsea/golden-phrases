import { Component,
         OnInit,
         Input,
         HostListener,
         ViewChild,
         ElementRef } from '@angular/core';

@Component({
  selector: 'gp-section-sound',
  templateUrl: './section-sound.component.html',
  styleUrls: ['./section-sound.component.scss']
})
export class SectionSoundComponent implements OnInit {
  @Input() sectionId: number;
  @ViewChild('audio') audio: ElementRef;
  soundUrl = "";
  private _enOnly = false;

  constructor() { }

  get enOnly() { return this._enOnly; };
  set enOnly(nextState: boolean) {
    this._enOnly = nextState;
    this.setSoundUrl();
  }

  ngOnInit() {
    this.setSoundUrl();
  }

  private setSoundUrl() {
    let dir = this.enOnly ? "sections_e" : "sections";
    let num = ('0' + this.sectionId).slice(-2); // zero padding
    this.soundUrl = `assets/sounds/${dir}/section${num}.mp3`;
  }

  @HostListener('document:keydown', ['$event'])
  private toggleSoundOnKeySpace(event: KeyboardEvent): void {
    const KEY_SPACE = 32;
    if (event.keyCode == KEY_SPACE) {
      let element: HTMLAudioElement = this.audio.nativeElement;
      element.paused ? element.play() : element.pause();
      event.preventDefault();
    }
  }

}
