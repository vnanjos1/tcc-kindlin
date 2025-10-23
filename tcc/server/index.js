import { createServer } from 'node:http';
import { parse } from 'node:url';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { db } from './database.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const HEADERS = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const server = createServer(async (req, res) => {
  const { method, url } = req;
  const { pathname } = parse(url ?? '', true);

  if (method === 'OPTIONS') {
    res.writeHead(204, HEADERS);
    res.end();
    return;
  }

  try {
    if (method === 'GET' && pathname === '/api/health') {
      return sendJson(res, 200, { status: 'ok' });
    }

    if (method === 'POST' && pathname === '/api/auth/register') {
      const body = await parseJsonBody(req);
      return handleRegister(res, body);
    }

    if (method === 'POST' && pathname === '/api/auth/login') {
      const body = await parseJsonBody(req);
      return handleLogin(res, body);
    }

    sendJson(res, 404, { message: 'Rota não encontrada.' });
  } catch (error) {
    console.error('Erro inesperado', error);
    if (!res.headersSent) {
      sendJson(res, 500, { message: 'Erro interno do servidor.' });
    } else {
      res.end();
    }
  }
});

server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json', ...HEADERS });
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error('Payload muito grande.'));
        req.destroy();
      }
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('JSON inválido.'));
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}

function handleRegister(res, payload) {
  const {
    userType,
    nome,
    email,
    telefone,
    cpf,
    dataNascimento,
    cep,
    endereco,
    numero,
    complemento,
    cidade,
    estado,
    areaInteresse,
    experiencia,
    escolaridade,
    habilidades,
    password,
    confirmPassword,
  } = payload;

  if (!userType) {
    return sendJson(res, 400, { message: 'Selecione como deseja participar.' });
  }

  if (!nome || !email || !password || !confirmPassword) {
    return sendJson(res, 400, { message: 'Nome, e-mail e senha são obrigatórios.' });
  }

  if (password !== confirmPassword) {
    return sendJson(res, 400, { message: 'As senhas não coincidem.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);

  if (existingUser) {
    return sendJson(res, 409, { message: 'Este e-mail já está cadastrado.' });
  }

  const passwordHash = hashPassword(password);

  const insert = db.prepare(`
    INSERT INTO users (
      user_type,
      nome,
      email,
      telefone,
      cpf,
      data_nascimento,
      cep,
      endereco,
      numero,
      complemento,
      cidade,
      estado,
      area_interesse,
      experiencia,
      escolaridade,
      habilidades,
      password_hash
    ) VALUES (
      @user_type,
      @nome,
      @email,
      @telefone,
      @cpf,
      @data_nascimento,
      @cep,
      @endereco,
      @numero,
      @complemento,
      @cidade,
      @estado,
      @area_interesse,
      @experiencia,
      @escolaridade,
      @habilidades,
      @password_hash
    )
  `);

  const info = insert.run({
    '@user_type': userType,
    '@nome': normalizeText(nome),
    '@email': normalizedEmail,
    '@telefone': optionalText(telefone),
    '@cpf': optionalText(cpf),
    '@data_nascimento': optionalText(dataNascimento),
    '@cep': optionalText(cep),
    '@endereco': optionalText(endereco),
    '@numero': optionalText(numero),
    '@complemento': optionalText(complemento),
    '@cidade': optionalText(cidade),
    '@estado': optionalText(estado),
    '@area_interesse': optionalText(areaInteresse),
    '@experiencia': optionalText(experiencia),
    '@escolaridade': optionalText(escolaridade),
    '@habilidades': optionalText(habilidades),
    '@password_hash': passwordHash,
  });

  return sendJson(res, 201, {
    message: 'Usuário cadastrado com sucesso!',
    user: {
      id: info.lastInsertRowid,
      nome: normalizeText(nome),
      email: normalizedEmail,
      userType,
    },
  });
}

function handleLogin(res, payload) {
  const { email, password } = payload;

  if (!email || !password) {
    return sendJson(res, 400, { message: 'Informe e-mail e senha.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);

  if (!user || !verifyPassword(password, user.password_hash)) {
    return sendJson(res, 401, { message: 'Credenciais inválidas.' });
  }

  return sendJson(res, 200, {
    message: 'Login realizado com sucesso!',
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      userType: user.user_type,
    },
  });
}

function hashPassword(password) {
  const salt = randomBytes(16);
  const derivedKey = scryptSync(password, salt, 64);
  return `${salt.toString('hex')}:${derivedKey.toString('hex')}`;
}

function verifyPassword(password, storedHash) {
  try {
    const [saltHex, hashHex] = storedHash.split(':');
    if (!saltHex || !hashHex) {
      return false;
    }

    const salt = Buffer.from(saltHex, 'hex');
    const stored = Buffer.from(hashHex, 'hex');
    const derived = scryptSync(password, salt, 64);

    return timingSafeEqual(stored, derived);
  } catch (error) {
    console.error('Erro ao verificar senha', error);
    return false;
  }
}

function normalizeText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function optionalText(value) {
  if (typeof value !== 'string') {
    return value ?? null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
