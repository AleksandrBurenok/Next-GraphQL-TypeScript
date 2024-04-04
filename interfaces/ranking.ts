export interface Standing {
  logo_path: string;
  position: number;
  statistic: {
    A: number;
    D: number;
    F: number;
    GD: string;
    L: number;
    Last5: [L: string, W: string];
    P: number;
    PTS: number;
    W: number;
  };
  team_id: number;
  team_name: string;
}

export interface Ranking {
  id: number;
  logo_path: string;
  name: string;
  standings: Standing[];
  translate: {
    th: {
      name: string;
    };
  };
}
