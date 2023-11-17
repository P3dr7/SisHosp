import { getRedis } from "../redisConfig";

export async function recuperarDoCache() {
    try {
      const dadoNoCache = await getRedis('verificaUser');
      return JSON.parse(dadoNoCache); // Converta para objeto JavaScript, se necessário
    } catch (error) {
      console.error('Erro ao recuperar dado do cache:', error.message);
      return null;
    }
  }