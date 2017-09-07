import { Component,
         OnChanges,
         Input,
         Output,
         EventEmitter,
         ViewChild,
         ElementRef,
         HostListener } from '@angular/core';

import { PhraseConversionService } from '../../core/phrase-conversion.service';
import { Phrase } from '../../core/phrase';


@Component({
  selector: 'gp-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnChanges {
  @Input() phrase: Phrase;
  @Output() answered = new EventEmitter<[number, boolean]>();
  @ViewChild("ansInput") ansInput: ElementRef;
  isAnswered = false;
  phraseJa: string;
  phraseEn: string;
  meanings: string[];
  explanations: string[];
  answer: string;
  reply: string;
  isCorrect: boolean;

  constructor(private pcs: PhraseConversionService) { }

  ngOnChanges() {
    this.ansInput.nativeElement.disabled = false;
    this.ansInput.nativeElement.focus()
    this.isAnswered = false;
    this.answer = "";
    this.phraseJa = this.pcs.highlight(this.phrase.phraseJa);
    this.phraseEn = this.pcs.convertToDash(this.phrase.phraseEn);
    this.meanings = this.pcs.splitByBadge(this.phrase.meanings)
      .map(s => this.pcs.convertBadge(s));
    this.explanations = this.pcs.splitByBadge(this.phrase.explanation)
      .map(s => this.pcs.convertBadge(s));
  }

  onAnswer(answer: string) {
    if (answer === "" || this.isAnswered) return;

    let candidates = this.getAnswerCandidates(this.phrase);

    if (candidates.includes(answer.trim().toLowerCase())) {
      this.isCorrect = true;
      this.reply = "正解!";
    } else {
      this.isCorrect = false;
      this.reply = `不正解: ${this.phrase.answer}`;
    }
    setTimeout(() => this.isAnswered = true, 0);
  }

  next() {
    this.answered.emit([this.phrase.id, this.isCorrect])
  }

  private getAnswerCandidates({phraseEn, answer}: Phrase): string[] {
    let candidates: string[] = [];
    let plain = answer.split(' ')[0];

    candidates.push(plain);
    if (answer.search(/\((\w+)\)/) != -1)
      candidates.push(RegExp.$1);
    if (phraseEn.search(/[a-z-]\*([a-z-]+)/) != -1)
      candidates.push(plain + RegExp.$1);

    return candidates;
  }

  @HostListener('document:keyup', ['$event'])
  private nextOnEnter(event: KeyboardEvent): void {
    const KEY_ENTER = 13;
    if (event.keyCode === KEY_ENTER && this.isAnswered) this.next();
  }
}
