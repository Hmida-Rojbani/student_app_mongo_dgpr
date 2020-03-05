const mongoose = require('mongoose');
const mongoDebug = require('debug')('app:db');
const config = require('config')

async function connectToMongo(path)
{
    try{
        await mongoose.connect(path, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false});
        mongoDebug('Mongo is Up.')
    }catch(err){
        mongoDebug(`Mongo is Down. Reason :`,err.message);
    }
    
}

connectToMongo(config.get('db.protocole')+config.get('db.user')
    +config.get('db.password')+config.get('db.path')+config.get('db.name'));

