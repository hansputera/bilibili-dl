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
