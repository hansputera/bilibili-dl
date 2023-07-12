import type {IResponseAPI, OGVCard} from './general.type';

export type ITimelineAPI = IResponseAPI<TimelineData>;

export interface TimelineData {
    items: TimelineItem[];
    current_time: string;
    current_time_ts: number;
}

export interface TimelineItem {
    day_of_week: string;
    is_today: boolean;
    date_text: string;
    full_date_text: string;
    full_day_of_week: string;
    cards: OGVCard[];
}
