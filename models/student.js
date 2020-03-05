const mongoose = require('mongoose');
const Joi = require('joi');

const class_schema = new mongoose.Schema({
    name : {type : String, required : true},
    max_student : Number
})

const student_schema = new mongoose.Schema({
    name : {type :String , required :true},
    email : {type: String, required : true , unique : true},
    class : {type : class_schema, required : true},
    date_inscit : {type: Date, default : Date.now() }
});

const student_validation_schema = {
    name : Joi.string().min(3).max(25).required(),
    email : Joi.string().email().required(),
    class : {
        name : Joi.string().min(3).max(12).required(),
        max_student : Joi.number().positive()
    },
    date_inscit : Joi.date()
}

const Student = mongoose.model('Student', student_schema);

function student_validation (body){
    return Joi.validate(body,student_validation_schema).error;
}

module.exports.Student = Student;
module.exports.student_validation = student_validation;