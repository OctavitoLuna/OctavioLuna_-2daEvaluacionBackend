const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes');
const commentRoutes = require('./routes/commentRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const logRoutes = require('./routes/logRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');  // Importar el middleware

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
  });

// Usar las rutas y protegerlas con el middleware
app.use('/api/usuarios', userRoutes);
app.use('/api/documentos', verifyToken, documentRoutes);  // Asegúrate de que todas las rutas estén protegidas
app.use('/api/comentarios', commentRoutes);
app.use('/api/permisos', permissionRoutes);
app.use('/api/logs', logRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
