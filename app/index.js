const path = require('path');
const express = require('express');
const cors = require('cors');

const router = require('./routers');

const app = express();

// Swagger-Doc
const {specs, serve, setup} = require('./swagger-doc/swaggerDocs');
app.use('/api-docs', serve, setup(specs));

// On active le middleware pour parser le payload JSON
app.use(express.json());

// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

// Set images directory static
app.use(express.static('public'));


// On lève la restriction CORS pour nos amis React
app.use(cors(process.env.CORS_DOMAINS || '*'));

app.use(router);


module.exports = app;