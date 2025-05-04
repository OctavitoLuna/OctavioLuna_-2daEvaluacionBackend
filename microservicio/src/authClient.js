// src/authClient.js
const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.API_URL;
const CORREO = process.env.CORREO;
const CONTRASENA = process.env.CONTRASENA;

let tokenCache = null;

async function login() {
  try {
    const response = await axios.post(`${API_URL}/api/usuarios/login`, {
      correo: CORREO,
      contraseña: CONTRASENA,
    });

    tokenCache = response.data.token;
    return tokenCache;
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error.response?.data || error.message);
    throw new Error('No se pudo iniciar sesión');
  }
}

async function getToken() {
  if (!tokenCache) {
    await login();
  }
  return tokenCache;
}

module.exports = { getToken };
