// external imports
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// local imports
import { get } from '../lol';
// enums & models
import {
  RIOT_ROOT_URL,
  MATCH_ENDPOINT,
  MATCH_VERSION_5,
} from '../../enums';

import { getMatchByMatchId, getMatchesByPuid } from '../../services/match/index';
import { MatchDTO } from '../../models/match';

/**
 * Given region, puuid, count, returns a map where key is champion, and value are a list of matches (MatchDTO) with that champion
 * @param puuid Encrypted PUUID
 * @param region Name of the region, for example americas
 * @param count Number of matches to retrieve
 * @returns Map<string, MatchDTO[]> 
 */
export const matchDataByChamp = async (
    region: string,
    puuid: string,
    count: number,
) => {
    try {
        // Retrieving list of matches from puuid
        let matches = await getMatchesByPuid(puuid, region, count);

        // Creating Map to insert matches into, key is string, value is MatchDTO
        let champObject: any = {};

        // Verifies that there are matches
        if(matches){
            // Iterating through every match
            for (let i = 0; i < matches.length; i++){
                // Getting match information with matchID
                let match = await getMatchByMatchId(matches[i], region);
                if(match){
                    // Iterating through participants to find matching puuid participant
                    for(let i = 0; i < match.info.participants.length; i++){
                        if(puuid === match.info.participants[i].puuid){
                            // insert champion as key, and match as value into Map
                            let champion:string = match.info.participants[i].championName
                            // if key already exists (previously played same champ)
                            if(champObject.hasOwnProperty(champion)){
                                champObject[champion]!.push(match);
                            } else {
                                champObject[champion] = [match];
                            }
                            // Get out of participant loop (only one can match to puuid)
                            break;
                        }
                    }
                }
            }
        }
        return champObject;
    } catch (e) {
        if (e instanceof Error) {
        console.log(e.message);
        throw e;
        }
    }
};