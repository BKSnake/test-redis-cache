import Redis from 'ioredis';

const cache = new Redis(6379);

export default cache;