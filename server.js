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

var http = require('http').Server(app);
var io = require('socket.io')(http);

var visitorsData = {};

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

// io.on('connection', function(socket) {
//   visitorsData[socket.id] = data;
//   // a user has visited our page - add them to the visitorsData object
//   socket.on('disconnect', function() {
//     // a user has left our page - remove them from the visitorsData object
//     delete visitorsData[socket.id];
//   });
// });

io.on('connection', function(socket) {
  if (socket.handshake.headers.host === config.host
  && socket.handshake.headers.referer.indexOf(config.host + config.dashboardEndpoint) > -1) {

    // if someone visits '/dashboard' send them the computed visitor data
    io.emit('updated-stats', computeStats());

  }

  // a user has visited our page - add them to the visitorsData object
  socket.on('visitor-data', function(data) {
    visitorsData[socket.id] = data;

    // compute and send visitor data to the dashboard when a new user visits our page
    io.emit('updated-stats', computeStats());
  });

  socket.on('disconnect', function() {
    // a user has left our page - remove them from the visitorsData object
    delete visitorsData[socket.id];

    // compute and send visitor data to the dashboard when a user leaves our page
    io.emit('updated-stats', computeStats());
  });
});

// wrapper function to compute the stats and return a object with the updated stats
function computeStats(){
  return {
    pages: computePageCounts(),
    referrers: computeRefererCounts(),
    activeUsers: getActiveUsers()
  };
}

// get the total number of users on each page of our site
function computePageCounts() {
  // sample data in pageCounts object:
  // { "/": 13, "/about": 5 }
  var pageCounts = {};
  for (var key in visitorsData) {
    var page = visitorsData[key].page;
    if (page in pageCounts) {
      pageCounts[page]++;
    } else {
      pageCounts[page] = 1;
    }
  }
  return pageCounts;
}

// get the total number of users per referring site
function computeRefererCounts() {
  // sample data in referrerCounts object:
  // { "http://twitter.com/": 3, "http://stackoverflow.com/": 6 }
  var referrerCounts = {};
  for (var key in visitorsData) {
    var referringSite = visitorsData[key].referringSite || '(direct)';
    if (referringSite in referrerCounts) {
      referrerCounts[referringSite]++;
    } else {
      referrerCounts[referringSite] = 1;
    }
  }
  return referrerCounts;
}

// get the total active users on our site
function getActiveUsers() {
  return Object.keys(visitorsData).length;
}


app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});

module.exports = app;
