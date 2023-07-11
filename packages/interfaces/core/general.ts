export interface TimelineAnime {
    day_of_week: string;
    is_today: boolean;
    date_text: string;
    full_date_text: string;
    full_day_of_week: string;
    cards: TimelineCard[];
}

export interface LiveContent {
    card_type: Card_Type;
    type: string;
    title: string;
    cover: string;
    view: string;
    author: Author;
    live: Live;
}

export interface OGVContent {
    type: string;
    card_type: Card_Type;
    title: string;
    cover: string;
    view: string;
    dm: string;
    styles: string;
    style_list: string[];
    season_id: string;
    episode_id: string;
    index_show: string;
    label: number;
    rank_info?: any;
    view_history?: any;
    watched: string;
    duration: string;
    view_at: string;
    pub_time_text: string;
    pub_time_ts: number;
    is_favored: boolean;
    unavailable: boolean;
}

export interface UGCContent {
    type: string;
    aid: string;
    card_type: Card_Type;
    title: string;
    cover: string;
    view: string;
    dm: string;
    duration: string;
    author: Author;
    view_at: string;
    view_history?: any;
    live?: any;
    unavailable: boolean;
    rank_info?: any;
}

export type PopularCards = PopularContent[];
export type ListTimelineAnime = TimelineAnime[];
export type RecommendationContent = UGCContent | OGVContent;

export interface TimelineCard {
    type: string;
    card_type: string;
    title: string;
    cover: string;
    view: string;
    dm: string;
    styles: string;
    style_list: string[];
    season_id: string;
    episode_id: string;
    index_show: string;
    label: number;
    rank_info?: any;
    view_history?: any;
    watched: string;
    duration: string;
    view_at: string;
    pub_time_text: string;
    pub_time_ts: number;
    is_favored: boolean;
    unavailable: boolean;
}

type Card_Type = 'ogv_anime' | 'ugc_video';

interface Live {
    state: number;
    room_id: number;
}

interface Author {
    mid: string;
    avatar: string;
    nickname: string;
    identity: Identity;
}

interface Identity {
    role: number;
    icon: string;
}

type PopularContent = UGCContent | LiveContent;
