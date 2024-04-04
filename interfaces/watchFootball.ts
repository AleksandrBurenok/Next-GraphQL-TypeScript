export interface Link {
  link: string;
  title: string;
}

export interface WatchFootball {
  isLiveNow: boolean;
  league: string;
  links: Link[];
  live: {
    away: string;
    home: string;
    time_remaining: string;
  };
  team1: {
    image: string;
    text: string;
  };
  team2: {
    image: string;
    text: string;
  };
  time: string;
}
