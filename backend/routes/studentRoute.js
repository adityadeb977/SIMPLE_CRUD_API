const express= require('express');
const router=express.Router();
const Student=require('../models/studentModel.js')

//get all students
router.get('/api/students',async (req,res)=>{
    try {
        const students= await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({error: error});
    }
})

//add a student
router.post('/api/students',async(req,res)=>{
    try {
        const newStudent=await Student.create(req.body);
    res.status(200).json({message: 'Student created successfully',student: newStudent},   
    )
    } catch (err) {
        res.status(500).json({error: err})
    }
    
})
//get student by id
router.get('/api/students/:id',async(req,res)=>{
    try {
            const {id}=req.params;
    const student= await Student.findById(id);
    res.status(200).json(student);
    } catch (error) {
        res.status(500).json(error);
    }
})
//update student
router.put('/api/students/:id',async(req,res)=>{
    try {
        const{id}= req.params;
         const newStudent = await Student.findByIdAndUpdate(id,req.body,{new:true});
         res.status(200).json(newStudent);
    } catch (error) {
        res.status(500).json({error : error});
    }
})
//delete a student
router.delete('/api/students/:id',async(req,res)=>{  
    try {
        const{id}=req.params;
    const deletedStudent=await Student.findByIdAndDelete(id);
    res.status(200).json(deletedStudent);
    } catch (error) {
        res.status(500).json({error:error});
    }
})
module.exports=router;