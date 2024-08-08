import { RIOT_API_KEY } from '../constants';

export const getRiotHeaders = (headers = {}) => ({
  ...headers,
  'X-Riot-Token': RIOT_API_KEY,
});
