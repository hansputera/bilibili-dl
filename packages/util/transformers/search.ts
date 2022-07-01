/* eslint-disable */

import {Exclude, Expose, Transform} from 'class-transformer';
import {baseURL} from '@bilibili-dl/config/constants.js';
import {matchView} from '..';

export type ItemType = 'anime' | 'video';

/**
 * @class SearchTransformed
 */
export class ItemTransformed {
    @Expose()
    @Transform(({value}) => value.trim())
    title!: string;

    @Exclude()
    @Expose({name: 'mid'})
    _mId!: number;

    @Exclude()
    @Expose({name: 'aid'})
    _aId!: number;

    @Exclude()
    @Expose({name: 'season_id'})
    _seasonId!: number;

    @Expose()
    get id(): number {
        return this._aId || this._mId || this._seasonId;
    }

    @Expose()
    get url(): string {
        // TODO: use requested "locale"
        return new URL(
            `./en/${
                this.type === 'anime' ? 'play' : 'video'
            }/${encodeURIComponent(this.id)}`,
            baseURL,
        ).href;
    }

    @Expose()
    @Exclude({toPlainOnly: true})
    desc!: string;

    @Expose()
    @Exclude({toPlainOnly: true})
    cover!: string;

    @Expose()
    @Exclude({toPlainOnly: true})
    score!: number;

    @Expose()
    @Exclude({toPlainOnly: true})
    styles!: string;

    @Expose()
    get description(): string {
        return this.desc;
    }

    @Expose()
    get thumbnail(): string {
        return this.cover;
    }

    @Expose()
    get rating(): number {
        return this.score;
    }

    @Expose()
    get genre(): string {
        return this.styles;
    }

    @Expose({name: 'view'})
    @Transform(({value}) => matchView(value))
    @Exclude({toPlainOnly: true})
    _views!: string;

    @Expose()
    get views(): string {
        return this._views === '0' ? matchView(this.desc) : this._views;
    }

    @Expose({name: 'duration'})
    @Transform(({value}) => (value.length ? value : '-'))
    duration!: string;
    @Expose()
    get type(): ItemType {
        return this.duration === '-' ? 'anime' : 'video';
    }
}
