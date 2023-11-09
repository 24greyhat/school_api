const mongoose = require("mongoose")


// creating a student's schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String, // name is a string
        required: true // name is required
    },
    studentId:{
        type: Number, // studentId is a number
        required: true, // studentId is required
    },
    major: {
        type: String, // major is a string
        required: true, // major is required
    },
    enrolledSince: {
        type: Date, // enrolledSince is a date
        required: true, // enrolledSince is required
        default: Date.now // enrolledSince is given a default value of Date.now
    }
})


// export studentSchema
module.exports = mongoose.model("Student", studentSchema)