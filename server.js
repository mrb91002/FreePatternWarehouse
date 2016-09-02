'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true });
}

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;


// Middleware
const ev = require('express-validation');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Client Routes
// const customers = require('./routes/customers');
const patterns = require('./routes/patterns');
// const token = require('./routes/token');
// const promos = require('./routes/promos');
// const orders = require('./routes/orders');
// const payment = require('./routes/payment');

// Admin Routes
// const customersAdmin = require('./routes/admin/customers');
// const productsAdmin = require('./routes/admin/products');
// const promosAdmin = require('./routes/admin/promos');
// const ordersAdmin = require('./routes/admin/orders');

const app = express();

app.disable('x-powered-by');

// Use Routes
switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Client Routes
// app.use('/api', customers);
app.use('/api', patterns);
// app.use('/api', token);
// app.use('/api', promos);
// app.use('/api', orders);
// app.use('/api', payment);

// Admin Routes
// app.use('/api/admin', customersAdmin);
// app.use('/api/admin', productsAdmin);
// app.use('/api/admin', promosAdmin);
// app.use('/api/admin', ordersAdmin);

// Page not found handler (for push-state serving of SPA)
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handler
// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'application/json')
      .send(err);
  }

  if (err.output && err.output.statusCode) {
    let responseType;

    if (err.json) {
      responseType = 'application/json';
    }
    else {
      responseType = 'text/plain';
    }

    return res
      .status(err.output.statusCode)
      .set('Content-Type', responseType)
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});

module.exports = app;
