import type {IResponseAPI, OGVCard, UGCCard} from './general.type';

export type IRecommendAPI = IResponseAPI<RecommendedData>;

export interface RecommendedData {
    cards: RecommendItem[];
    is_end: boolean;
}

export type RecommendItem = UGCCard | OGVCard;
