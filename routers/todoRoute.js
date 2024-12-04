import express from 'express'
import {
    addTodoController,
    completeTodoController,
    getAllTodosController,
    trashTodosController
} from '../controllers/todoController.js';

const router = express.Router();



// CREATE NEW TODO || POST
router.post('/add-todo', addTodoController)


// COMPLETE TODO || POST
router.post('/complete-todo/:id', completeTodoController)


// GET ALL TODOS || GET
router.get('/todos', getAllTodosController);

//TRASH TODOS || GET
router.post('/trash-todo/:id', trashTodosController);





export default router;