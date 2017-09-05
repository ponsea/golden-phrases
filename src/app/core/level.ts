export class Level {
  id: number;
  title: string;
  sections: { id: number }[];
}

export class LevelsResponse {
  data: Level[];
}
