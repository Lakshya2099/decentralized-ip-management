const cors = require('cors');

const corsMiddleware = cors({
  origin: 'http://localhost:5173',
  credentials: true,
});

module.exports = corsMiddleware;
