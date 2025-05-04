// src/documentosClient.js
const axios = require('axios');
const { getToken } = require('./authClient');
require('dotenv').config();

const API_URL = process.env.API_URL;

async function crearDocumento(datosDocumento) {
  try {
    const token = await getToken();

    const response = await axios.post(`${API_URL}/api/documentos/crear`, datosDocumento, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error al crear el documento:', error.response?.data || error.message);
    throw new Error('No se pudo crear el documento');
  }
}

module.exports = { crearDocumento };
