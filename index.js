const express = require('express');
const morgan = require('morgan');
const config = require('config');
const appDebug = require('debug')('app:debug');
require('./db_connection/connectDb');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
if(app.get('env') === "development")
    app.use(morgan('dev'));


app.listen(port, () => appDebug(`Application is Up on ${port}...`));
    

