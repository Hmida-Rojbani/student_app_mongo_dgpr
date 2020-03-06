const router = require('express').Router();
const {ClassRoom} = require('../models/class');
const _ = require('lodash');

router.post('/', async(req,res)=>{
    const classRoom = new ClassRoom (_.pick(req.body,['name','max_student','modules']));
    res.send(await classRoom.save());
}
)

module.exports = router