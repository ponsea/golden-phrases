export class Score {
  id: number;
  sectionId: number;
  createdAt: Date;
  correctCount: number;
  allCount: number;
  scoreDetails?: ScoreDetail[];
}

export class ScoreDetail {
  phraseId: number;
  correct: boolean;
}

export class ScoreHeading {
  sectionId: number;
  correctCount: number;
  allCount: number;
}
