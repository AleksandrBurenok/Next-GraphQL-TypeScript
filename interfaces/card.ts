import { eventTypes } from 'components/Pages/Livescore/EventTypes';

export interface Card {
  id: number;
  team_id: string;
  type: keyof typeof eventTypes;
  fixture_id: number;
  player_id: number;
  player_name: string;
  minute: number;
  result: string;
}
