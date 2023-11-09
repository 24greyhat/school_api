const express = require('express')
const router = express.Router()

// requiring student
const Student = require("../models/management");


// this api is not production ready this is very simple
// am used to creating apis in python 
// node js is not my thing but this is the demo!


router.get("/", (req,res)=> {
    return res.json({
        "overview (GET)": "/",
        "create student (POST)": "/createStudent",
        "get all students (GET)": "/students",
        "get student by studentId (GET)": "/student/:studentId",
        "update student (POST)": "/updateStudent/:studentId",
        "delete student (DELETE)": "/deleteStudent/:studentId"
    });
})

// get all students
router.get('/students', async (req,res)=> {
    try {
        // getting all students
        const students = await Student.find();
        // sending back users in json format 
        return res.json(students);
    }catch (err){
        /*
        on error send a json response with
        error message and http status code 500 
        which means there is an intenral server
        error.
        */
        return res.status(500).json({message: err.message});
    }
})

// get student by id
router.get("/student/:studentId", async (req, res)=> {
    try{
        const student = await Student.find({studentId: req.params.studentId});
        if(student===null)
            // 404 = student not found!
            return res.status(404).json({message: "Cannot find student!"})
        return res.json(student);
    } catch(err){
        return res.status(500).json({message: err.message})
    }



})

// create student
router.post('/createStudent', async (req,res)=> {
    const student = new Student({
        name: req.body.name,
        studentId: req.body.studentId,
        major: req.body.major
    });

    try {
        // try to save student
        const newStudent = await student.save();
        
        /* send back the student with status code
            with status code 201 meaning object 
            successfully created!
        */
        return res.status(201).json(newStudent)
    } catch (err) {
        /* status code 400 means the data
         user provided is wrong */
        return res.status(400).json({message: err.message})
    }

})

// updater student
router.post('/updateStudent/:studentId', async (req, res)=> {
    try{
        const student = await Student.updateOne({studentId: req.params.studentId}, {
            name: req.body.name,
            studentId: req.body.studentId,
            major: req.body.major
        });
        return res.status(200).json({message: "updated!"});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
})

// delete student
router.delete('/delete/:studentId', async (req, res)=> {
    try{
        const student = await Student.findOneAndDelete({studentId: req.params.studentId});
        return res.json({message:"deleted!"})
    }catch(err){
        return res.status(500).json({message: err.message});
    }
})


module.exports = router