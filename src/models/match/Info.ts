// model
import { ParticipantDTO } from './Participant';
import { TeamDTO } from './Team';

export interface InfoDTO {
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: string;
  gameType: string;
  gameVersion: string;
  mapId: number;
  partcipants: ParticipantDTO[];
  platformId: string;
  queueId: number;
  teams: TeamDTO[];
  tournamentCode: string;
}
