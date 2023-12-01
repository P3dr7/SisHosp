import { getRedis } from "../redisConfig.js";
import jwt from 'jsonwebtoken';

export async function recuperarDoCache() {
  const dadoNoCache = await getRedis('verificaUser');
  
  if (!dadoNoCache) {
    console.log('Token não encontrado no cache.');
    return null;
  }

  const cacheJSON = JSON.parse(dadoNoCache);
  let auth = cacheJSON.auth;
  let secret = 'chave_secreta'; // Certifique-se de usar a mesma chave
  const token = cacheJSON.token;
  // console.log(token);

  try {
    const tokenExpirado = verificaExpi(token, secret);
    if (tokenExpirado) {
      auth = false
      // throw new Error('Token expirado');
      
    }

    // Decodificar o token usando a chave secreta
    const userId = await verifyJWT(token, secret);
    // console.log("UserID recuperado:", userId);

    const data = { auth, userId }; // Definindo auth como false se o token expirou
    // console.log(data);
    // Retornar os dados decodificados
    return data;
  } catch (error) {
    console.error('Erro ao recuperar e decodificar o token do cache:', error.message);
    return null;
  }
}
export async function recuperarEmailDoCache() {
  const dadoNoCache = await getRedis('verificaUser');
  
  if (!dadoNoCache) {
    console.log('Token não encontrado no cache.');
    return null;
  }

  const cacheJSON = JSON.parse(dadoNoCache);
  let auth = cacheJSON.auth;
  let secret = 'chave_secreta'; // Certifique-se de usar a mesma chave
  const token = cacheJSON.token;
  console.log(token);

  try {
    const tokenExpirado = verificaExpi(token, secret);
    if (tokenExpirado) {
      auth = false
      // throw new Error('Token expirado');
      
    }

    // Decodificar o token usando a chave secreta
    const userEmail = await verifyJWTEmail(token, secret);
    // console.log("UserID recuperado:", userId);
    console.log(userEmail)
    const data = { auth, userEmail }; // Definindo auth como false se o token expirou
    // console.log(data);
    // Retornar os dados decodificados
    console.log(data)
    return data;
  } catch (error) {
    console.error('Erro ao recuperar e decodificar o token do cache:', error.message);
    return null;
  }
}

async function verifyJWT(token, secret) {
  return new Promise((resolve, reject) => {
    if (!token) 
      reject({ auth: false, message: 'Token não informado.' });

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        reject({ auth: false, message: 'Token inválido.' });
      }
      
      // Acesse os dados do token, por exemplo, o ID do usuário
      const userEmail = decoded.id;

      // Imprima ou faça algo com os dados
      console.log("User Id: " + userEmail);
      resolve(userEmail);
    });
  });
}

async function verifyJWTEmail(token, secret) {
  return new Promise((resolve, reject) => {
    if (!token) 
      reject({ auth: false, message: 'Token não informado.' });

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        reject({ auth: false, message: 'Token inválido.' });
      }
      
      // Acesse os dados do token, por exemplo, o ID do usuário
      const userId = decoded.email;

      // Imprima ou faça algo com os dados
      console.log("User Email: " + userId);
      resolve(userId);
    });
  });
}

function verificaExpi(token, secret) {
  try {
    const decoded = jwt.verify(token, secret);
    const expTimestamp = decoded.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000); // Tempo atual em segundos

    return currentTimestamp > expTimestamp; // Retorna true se o token expirou
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.log('Token expirado.');
      return true;
    } else {
      console.error("Erro ao verificar o token:", err.message);
      return false;
    }
  }
}
