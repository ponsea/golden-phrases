export class Phrase {
  id: number;
  number: number;
  level: number;
  section: number;
  phraseJa: string;
  phraseEn: string;
  answer: string;
  meanings: string;
  explanation: string;
}

export class PhrasesResponse {
  data: Phrase[];
}
