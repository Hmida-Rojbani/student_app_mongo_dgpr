const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const class_schema = new mongoose.Schema({
    _id : { type: mongoose.Schema.ObjectId, ref: 'Class' },
    name : {type : String, required : true, enum : ['GLSI','DMWM','SSIR','DSEN']},
    max_student : Number
})

const student_schema = new mongoose.Schema({
    name : {type :String , required :true},
    email : {type: String, required : true , unique : true},
    age: Number,
    class : {type : class_schema, required : true},
    extra_payment : {type : Number, required : function (){ return this.age>=28}, get: function (v) {return Math.round(v)} },
    date_inscit : {type: Date, default : Date.now() }
});

const student_validation_schema = {
    name : Joi.string().min(3).max(25).required(),
    email : Joi.string().email().required(),
    age : Joi.number().positive(),
    extra_payment: Joi.number().positive(),
    class_id : Joi.objectid(),
    date_inscit : Joi.date()
}

const student_validation_schema_update = {
    _id: Joi.objectid(),
    name : Joi.string().min(3).max(25),
    email : Joi.string().email(),
    age : Joi.number().positive(),
    extra_payment: Joi.number().positive(),
    class : {
        _id: Joi.objectid(),
        name : Joi.string().min(3).max(12),
        max_student : Joi.number().positive()
    },
    date_inscit : Joi.date()
}

const Student = mongoose.model('Student', student_schema);

function student_validation (body){
    return Joi.validate(body,student_validation_schema).error;
}

function student_validation_update (body){
    return Joi.validate(body,student_validation_schema_update).error;
}
const path_var_valiator_schema = {
    id: Joi.objectid().required()
}

function id_validation (pathVariables){
    return Joi.validate(pathVariables,path_var_valiator_schema).error;
}

module.exports.Student = Student;
module.exports.student_validation = student_validation;
module.exports.student_validation_update = student_validation_update;
module.exports.id_validation = id_validation;