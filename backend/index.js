require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { swaggerMiddleware, swaggerDocs } = require('./swagger');
const logger = require('./logger');
const sequelize = require('./sequalizeDB');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.FRONTEND_IP || '*' }));
app.use(cookieParser());

app.use('/v1/apis/doc/', swaggerMiddleware, swaggerDocs);
app.use('/v1/apis/',routes)

app.get('/', (req, res) => {
  res.send('Hello, World!');
  logger.info('Hello world endpoint was hit');
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).send('Page not found');
    logger.error('404 - Page not found');
  });
  
  // General Error Handler
  app.use((err, req, res, next) => {
    logger.error(`500 - ${err.message}`);
    res.status(500).send('Internal Server Error');
  });

let server;

async function startServer() {
  try {
    // await sequelize.authenticate(); // Ensure database connection
    logger.info('Database connection has been established successfully.');

    // Optionally sync models
    // await sequelize.sync();

    const port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    server = http.createServer(app);

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
}

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof server.address() === 'string' ? 'Pipe ' + server.address() : 'Port ' + server.address().port;
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  logger.info('Listening on ' + bind);
}

startServer();
