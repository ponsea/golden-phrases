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
      result = phraseEn.replace(/[a-z-]\*[a-z-]*/i, `{${RegExp.$1}}`);
    } else {
      result = phraseEn.replace(/[a-z-]\*([a-z-]*)/i, `{${answer.split(' ')[0]}$1}`);
    }
    return this.drawUnderline(this.highlight(result));
  }

  drawUnderline(phraseEn: string): string {
    return phraseEn.replace(/\b([a-z-]+)_\b|_([a-z-]+)_/ig, '<u>$1$2</u>');
  }

  convertBadge(subject: string): string {
    let icon = (type: string, icon: string) => {
      return `<span class="badge badge-${type} p-1">
                <i class="fa fa-${icon} fa-fw"></i>
              </span>`
    }

    return subject
      .replace(/\[([動名形副前接])\]/g,
               '<span class="badge badge-primary">$1</span>')
      .replace(/\[([類同反関例略])\]/g,
               '<span class="badge badge-default">$1</span>')
      .replace(/\[#\]/g, icon('success', 'commenting'))
      .replace(/\[@\]/g, icon('success', 'smile-o'))
      .replace(/\[!\]/g, icon('danger', 'exclamation'))
      .replace(/\[(.)\]/g, '<span class="badge badge-default">$1</span>');
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
    let result = phraseEn.replace(/([a-z-])\*([a-z-]*)/i, '{$1-------$2}');
    return this.drawUnderline(this.highlight(result));
  }
}
