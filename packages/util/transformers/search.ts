/* eslint-disable */

import {Expose, Transform} from 'class-transformer';

export type ItemType = 'anime' | 'video';

/**
 * @class SearchTransformed
 */
export class ItemTransformed {
    @Expose()
    @Transform(({value}) => value.trim())
    title!: string;
    @Expose({name: 'mid'})
    _videoId!: number;
    @Expose({name: 'season_id'})
    _seasonId!: number;
    @Expose()
    get id(): number {
        return this._videoId || this._seasonId;
    }
    @Expose({name: 'desc'}) description!: string;
    @Expose({name: 'cover'}) thumbnail!: string;
    @Expose({name: 'score'}) rating!: number;
    @Expose({name: 'styles'}) genre!: string;
    @Expose({name: 'view'})
    @Transform(
        ({value}) => value.match(/\d+((.|\/)+)?\d+(m|k)?/gi)?.at(0) ?? '0',
    )
    views!: string;
    @Expose({name: 'duration'})
    @Transform(({value}) => (value.length ? value : '-'))
    duration!: string;
    @Expose()
    get type(): ItemType {
        return this.duration === '-' ? 'anime' : 'video';
    }
}
