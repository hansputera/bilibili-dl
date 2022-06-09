export interface Resource {
    bandwith: number;
    codecs: string;
    duration: number;
    id: string; // we will use this to identify the video/audio.
    mime_type: string;
    quality: number;
    size: number;
    url: string; // audio url.
}

export interface VideoStreamInfo {
    desc_words: string;
    quality: number;
}

export interface VideoResource {
    audio_quality: number;
    stream_info: VideoStreamInfo;
    video_resource: Resource;
}