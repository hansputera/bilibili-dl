import type {IResponseAPI, UGCCard} from './general.type';

export type IPopularAPI = IResponseAPI<PopularData>;

export interface PopularData {
    cards: UGCCard[];
}
