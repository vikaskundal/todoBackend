const express =require('express');
const router= express.Router();
const {getTodo,createTodo,updateTodo,deleteTodo}=require('../Controllers/TodoControllers');
const authenticate=require('../middleware/authenticate');


router.get('/todos',authenticate.verifyToken,getTodo);
router.post('/todos',authenticate.verifyToken,createTodo);
router.put('/todos/:id',authenticate.verifyToken,updateTodo);
router.delete('/todos/:id',authenticate.verifyToken,deleteTodo);

module.exports=router;