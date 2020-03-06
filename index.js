const express = require('express');
const morgan = require('morgan');
const config = require('config');
const helmet = require('helmet');
const student_router = require('./routers/students');
const class_router = require('./routers/classes');
const user_router = require('./routers/users');
const login_router = require('./routers/auth');
const appDebug = require('debug')('app:debug');
require('./db_connection/connectDb');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR : jwtPrivateKey is not defined');
    process.exit(1);
}

if(!config.get('db.password')){
    console.error('FATAL ERROR : DB password is not defined');
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
if(app.get('env') === "development")
    app.use(morgan('dev'));

app.use('/api/students',student_router);
app.use('/api/classes',class_router);
app.use('/api/users',user_router);
app.use('/api/login',login_router);

app.listen(port, () => appDebug(`Application is Up on ${port}...`));
    

