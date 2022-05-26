const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if(!isProduction){
  //This enables cors only in development
  app.use(cors());
}

//helmet helps set a variety of header to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
  );

  // Set the _csrf Token and creates req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
    );

    app.use(routes);

  module.exports = app;
