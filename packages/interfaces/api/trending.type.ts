import type {IResponseAPI, OGVCard} from './general.type';

export type ITrendingAPI = IResponseAPI<TrendingData>;

export interface TrendingData {
    cards: OGVCard[];
}
