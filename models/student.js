const mongoose = require('mongoose');

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

const Student = mongoose.model('Student', student_schema);

module.exports.Student = Student;