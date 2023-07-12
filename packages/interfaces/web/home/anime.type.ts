import type {TimelineItem, TrendingData} from '@bilibili-dl/interfaces/api';

export enum PickCarousel {
    'popular' = 'popular',
    'populer' = 'populer',

    'sun' = 'sun',
    'mon' = 'mon',
    'tue' = 'tue',
    'wed' = 'wed',
    'thu' = 'thu',
    'fri' = 'fri',
    'sat' = 'sat',

    'min' = 'min',
    'sen' = 'sen',
    'sel' = 'sel',
    'rab' = 'rab',
    'kam' = 'kam',
    'jum' = 'jum',
    'sab' = 'sab',
}

export type OngoingAnime = TimelineItem & {
    key: Omit<PickCarousel, 'popular' | 'populer'>;
};

export type TrendingAnime = TrendingData & {
    key: PickCarousel.popular | PickCarousel.populer;
};

export type CarouselItem = OngoingAnime | TrendingAnime;

export type CarouselAnime = CarouselItem[];
