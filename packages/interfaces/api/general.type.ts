// this is different from Omit type!
export type Picked<T, K extends keyof T> = T[K];

export type IResponseAPI<T> = {
    code: number;
    message: string;
    ttl: number;
    data: T;
};

export interface LiveCard {
    card_type: 'live_recommend';
    type: string;
    title: string;
    cover: string;
    view: string;
    author: Author;
    live: Live;
}

export interface OGVCard {
    type: string;
    card_type: 'ogv_anime';
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

export interface UGCCard {
    type: string;
    aid: string;
    card_type: 'ugc_video';
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

interface Live {
    state: number;
    room_id: number;
}
