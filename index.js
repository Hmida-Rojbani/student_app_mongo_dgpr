const express = require('express');
const morgan = require('morgan');
const config = require('config');
const student_router = require('./routers/students');
const class_router = require('./routers/classes');
const appDebug = require('debug')('app:debug');
require('./db_connection/connectDb');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
if(app.get('env') === "development")
    app.use(morgan('dev'));

app.use('/api/students',student_router);
app.use('/api/classes',class_router);

app.listen(port, () => appDebug(`Application is Up on ${port}...`));
    

