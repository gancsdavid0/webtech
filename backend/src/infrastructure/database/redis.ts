import {Redis} from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

export const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    retryStrategy: (times:any) => {
        return Math.min(times * 50, 2000);
    },
    password: process.env.REDIS_PASSWORD || undefined,
});

redis.on('connect', () => {
    console.log('✅ Redis connected');
});

redis.on('error', (err: any) => {
    console.error('❌ Redis error:', err);
});

export const disconnectRedis = async () => {
    await redis.quit();
};