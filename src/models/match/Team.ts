import { BanDTO } from './Ban';
import { ObjectivesDTO } from './Objectives';

export interface TeamDTO {
  bans: BanDTO[];
  objectives: ObjectivesDTO;
  teamId: number;
  win: boolean;
}
