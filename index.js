const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./errorHandling/errorHandler');
const sequelize = require('./config/database'); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Página de inicio
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html');
});



/* app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); */


sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente con la base de datos.');
    app.use('/api', routes);
    app.use(errorHandler); 
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
    process.exit(1); 
  });

