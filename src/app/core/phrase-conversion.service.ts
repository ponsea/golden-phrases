import { Injectable } from '@angular/core';

@Injectable()
export class PhraseConversionService {

  constructor() { }

  highlight(subject: string): string {
    return subject.replace(/\{(.+?)\}/g, '<b class="text-danger">$1</b>');
  }

  embedAnswer(phraseEn: string, answer: string): string {
    let anotherAnswer = answer.match(/\((\w+)\)/)
    let result: string;
    if (anotherAnswer) {
      result = phraseEn.replace(/\w\*\w*/, `{${RegExp.$1}}`);
    } else {
      result = phraseEn.replace(/\w\*/i, `{${answer.split(' ')[0]}}`);
    }
    return this.drawUnderline(this.highlight(result));
  }

  drawUnderline(phraseEn: string): string {
    return phraseEn.replace(/\b([a-z-]+)_\b|_([a-z-]+)_/ig, '<u>$1$2</u>');
  }

  convertBadge(subject: string): string {
    return subject.replace(/\[([動名形副前接])\]/g,
                           '<span class="badge badge-primary">$1</span>')
                  .replace(/\[([類同反関例略])\]/g,
                           '<span class="badge badge-warning">$1</span>')
                  .replace(/\[(.)\]/g,
                           '<span class="badge badge-default">$1</span>');
  }

  splitByBadge(subject: string): string[] {
    return subject.replace(/(\[.\])/g, '\\$1')
                  .replace(/\([^)]*\\[^(]*\)/g, match => match.replace(/\\/g, ''))
                  .replace(/\]\\\[/g, '][')
                  .split('\\')
                  .splice(1)
                  .map(s => s.trim());
  }

  convertToDash(phraseEn: string): string {
    let result = phraseEn.replace(/([a-z-])\*([a-z-])*/i, '{$1-------$2}');
    return this.drawUnderline(this.highlight(result));
  }
}
