const router = require('express').Router();
const { Student, student_validation } = require('../models/student');


router.get('/welcome', (req,res)=>{
    res.send('Welcome to Student API');
});

router.get('/', async (req,res)=>{

    const students = await Student.find();
    if(students.length === 0)
        res.status(204).send();
    res.send(students)
    
})

router.post('/', async (req,res)=>{

    const validation_error = student_validation(req.body);
    if(validation_error)
        return res.status(400).send(validation_error.details[0].message);

    const student = new Student({
        name : req.body.name,
        email : req.body.email,
        class : {name : req.body.class.name},
    });

    try{
        const savedStudent = await student.save();
        return res.status(201).send(savedStudent);
    }catch(err){
        res.status(400).send('Something wrong in saving to DB. Data already exists');
    }
    
    
    
})





module.exports = router;