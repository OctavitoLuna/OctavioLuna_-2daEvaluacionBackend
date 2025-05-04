# 📡 Microservicio WebSocket - Creación de Documentos

Este microservicio permite la creación remota de documentos a través de WebSockets. Se conecta a un backend externo mediante una API REST protegida con autenticación JWT.

---

## 📁 Estructura del Proyecto

```bash
src/
├── servidorWS.js          # WebSocket principal
├── authClient.js          # Lógica de login al backend
├── documentosClient.js    # Envío de documentos al backend
.env                       # Variables de entorno
package.json
README.md
```


## ⚙️ ¿Cómo Funciona?
### 🧩 Servidor WebSocket (servidorWS.js)
El servidor escucha conexiones WebSocket en el puerto 4001. Cuando recibe un mensaje con tipo: "crearDocumento" y un objeto documento, se encarga de:

Obtener el token JWT autenticándose con /api/usuarios/login

Enviar una petición POST a /api/documentos/crear con el token

Enviar una respuesta al cliente WebSocket


### 🔐 Autenticación (authClient.js)
Este módulo realiza el login con las credenciales definidas en .env:
```bash
{
  "correo": "marco.luna.v@ucb.edu.bo",
  "contraseña": "admin"
}
```

## 📄 Cliente de Documentos (documentosClient.js)
Este módulo se encarga de:

Recibir el objeto documento enviado por el WebSocket

Enviar el documento al backend usando una petición POST autenticada

Estructura del documento esperado:

```bash
{
  "titulo": "Documento de Prueba",
  "autor": "Marco Luna",
  "fecha": "2025-05-04",
  "tipo": "PDF",
  "categoria": "Prueba WS",
  "archivo_url": "https://ejemplo.com/documento.pdf",
  "descripcion": "Documento enviado desde WebSocket",
  "usuario_responsable": "681795d0acd9bf13683b4d55"
}

```

## 🧪 Ejemplo de Flujo Completo
Cliente WebSocket se conecta al servidor (ws://localhost:4001)

Envía un mensaje como:
```bash
{
  "tipo": "crearDocumento",
  "documento": {
    "fecha": "2025-05-04",
    "tipo": "PDF",
    "categoria": "Prueba WS",
    "archivo_url": "https://ejemplo.com/documento.pdf",
    "descripcion": "Documento enviado desde WebSocket",
    "usuario_responsable": "681795d0acd9bf13683b4d55"
  }
}


```

El servidor se autentica, envía el documento al backend y responde con:

```bash
{
  "tipo": "respuesta",
  "estado": "ok",
  "mensaje": "Documento creado con éxito",
  "datos": {
    "mensaje": "Documento creado con éxito",
    "documento": {
      "titulo": "Documento de Prueba",
      "autor": "Marco Luna",
      ...
    }
  }
}
```

## ✅ Requisitos Previos

Node.js v18 o superior

Tener el backend corriendo en: http://localhost:5000

Rutas disponibles:
  POST /api/usuarios/login → login (JWT)
  POST /api/documentos/crear → creación de documentos

## 🚀 Instalación y Ejecución

```bash
# Clonar el repositorio
git clone <URL-del-repo>

# Instalar dependencias
npm install

# Ejecutar el servidor WebSocket
node src/servidorWS.js

```

## 📌 Notas Finales
Este gateway actúa únicamente como intermediario en tiempo real.

Asegúrate de que el backend esté funcionando correctamente antes de ejecutar el microservicio.

Puedes probar los endpoints REST con Postman antes de integrarlos con WebSocket.
