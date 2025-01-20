const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

module.exports = (io) => {
    router.post('/', (req,res)=> taskController.addTask(req,res,io));
    router.get('/', taskController.getTasks);
    router.put('/:id', (req,res)=> taskController.updateTask(req,res,io));
    router.delete('/:id', (req,res)=> taskController.deleteTask(req,res,io));
    return router; 
}