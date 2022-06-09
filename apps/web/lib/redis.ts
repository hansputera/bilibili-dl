import Redis from 'ioredis';

export const redis = new Redis(
    process.env.REDIS_URI ?? 'redis://:@localhost:6379',
);
