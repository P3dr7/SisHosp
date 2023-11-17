import { Redis } from "ioredis";
import { promisify } from "util";

let redisClient;

try {
  redisClient = new Redis({
    host: '127.0.0.1',
    port: 6379,
  });
} catch (error) {
  console.error('Erro ao conectar ao Redis:', error.message);
}

function getRedis(value) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value);
}

function setRedis(key, value) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
}

export { getRedis, setRedis };
