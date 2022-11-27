export interface SubtitleData {
    font_size: number;
    font_color: string;
    background_alpha: number;
    background_color: string;
    Stroke: string;
    body: {
        from: number;
        to: number;
        location: number;
        content: string;
    }[];
}

export interface SubtitleItem {
    url: string;
    lang: string;
    lang_key: string;
    subtitle_id: number;
}

export interface SubtitleResponse {
    message: string;
    data: {
        subtitles: SubtitleItem[];
    };
}
