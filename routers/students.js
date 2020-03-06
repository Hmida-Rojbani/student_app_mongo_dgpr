const router = require('express').Router();
const _ = require('lodash');
const config = require('config');
const { ClassRoom } = require('../models/class')
const { Student, student_validation, student_validation_update , id_validation } = require('../models/student');


router.get('/welcome', (req,res)=>{
    res.send('Welcome to Student API');
});

router.get('/name/:name', async (req,res)=>{
    const name = req.params.name;
    var students = await Student.find({ name : name});
    res.send(students);
});

router.get('/class/name/:class_name', async (req,res)=>{
    const class_name = req.params.class_name;
    var students = await Student.find({ "class.name" : class_name});
    res.send(students);
});

router.get('/class/name/:class_name/limit/:limit', async (req,res)=>{
    const class_name = req.params.class_name;
    var students = await Student.find({ "class.name" : class_name}).limit(parseInt(req.params.limit));
    res.send(students);
});

router.get('/class/name/:class_name/age/:age', async (req,res)=>{
    const class_name = req.params.class_name;
    const age = req.params.age;
    var students = await Student.find({ $and : [{"age":age}, {"class.name" : class_name} ] });
    res.send(students);
});

router.get('/', async (req,res)=>{

    const students = await Student.find().sort('name');
    if(students.length === 0)
        return res.status(204).send();
    res.send(students)
    
})

router.get('/sort/class/name/', async (req,res)=>{

    const students = await Student.find().sort('-class.name');
    if(students.length === 0)
        return res.status(204).send();
    res.send(students)
    
})
router.get('/id/:id', async (req,res)=>{
    const validation = id_validation(req.params);
    if(validation)
        return res.status(400).send(validation.details[0].message)
    const student = await Student.findById(req.params.id);
    if(!student)
        return res.status(404).send(`Student not found`);
    res.send(student)
    
})

router.post('/', async (req,res)=>{

    const validation_error = student_validation(req.body);
    if(validation_error)
        //changement de langage
        //return res.status(400).send(config.get('errors.'+validation_error.details[0].message)
        return res.status(400).send( validation_error.details[0].message);
    const classRoom = await ClassRoom.findById(req.body.class_id);
    if(!classRoom) 
        return res.status(400).send('Class with given id is missing');
    const student = new Student(_.pick(req.body, ['name','email','age','extra_payment']));
    student.class = _.pick(classRoom, ['_id','name','max_student']);
    try{
        const savedStudent = await student.save();
        return res.status(201).send(savedStudent);
    }catch(ex){
        res.status(400).send('Something wrong in saving to DB. '+ex.message);
    }
    
})

router.delete('/id/:id', async (req,res)=>{
    const validation = id_validation(req.params);
    if(validation)
        return res.status(400).send(validation.details[0].message)
    const student = await Student.findByIdAndRemove(req.params.id);
    if(!student)
        return res.status(404).send(`Student not found`);
    res.send(student)
    
})

router.put('/id/:id', async (req,res)=>{
    const validation = id_validation(req.params);
    if(validation)
        return res.status(400).send(validation.details[0].message)
    let student = await Student.findById(req.params.id);
    if(!student)
        return res.status(404).send(`Student not found`);

    const validation_error = student_validation_update(req.body);
    if(validation_error)
        return res.status(400).send(validation_error.details[0].message);
    student = _.merge(student,req.body);
    student = await student.save()
    
    res.send(student)
    
})



module.exports = router;