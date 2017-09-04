export class Phrase {
  id: number;
  number: number;
  sectionId: number;
  phraseJa: string;
  phraseEn: string;
  answer: string;
  meanings: string;
  explanation: string;
}

export class PhrasesResponse {
  data: Phrase[];
}
