const Todo= require('../Models/Todo');
//  get all the todos in the account
async function getTodo(req,res){
    try{
        const todos= await Todo.find({userId:req.user.userId,done:false});
        res.status(200).json(todos);

    }catch{
        res.status(500).json({message:'Error Fetching the todos'
        });

    }


}

// create new todos
async function createTodo(req,res){
    console.log(req.user.userId)
    try{
        const {title,description,date,time,done}=req.body;
        const userId= req.user.userId;
        
        
        const newTodo= new Todo({
            title,
            description,
            date,
            time,
            done,
            userId
           

        })
        
        await newTodo.save();
         res.status(201).json(newTodo);
    }catch(error){
        console.log('error is :' ,error);
        res.status(500).json({message:'unable to create the Todo'})

    }

}

// update the todos

async function updateTodo(req,res){
    try{
        const {id}=req.params; 
        console.log(id);
        const updatedTodo=await Todo.findByIdAndUpdate(id,{done:true},{new:true});
        res.status(200).json(updatedTodo);
    }catch{
        res.status(500).json({
            message:'Error updating the todos'
        });
    }

}

// Deleting the todos 

async function deleteTodo(req,res){
    try{
        const {id}=req.params;
        
        
        const deletedTodo=await Todo.findByIdAndDelete(id);
        if(!deletedTodo){
            res.status(404).json({
                message:'Todo not found'
            })
        }
        res.status(200).json({
            message:'Todo deleted successfully'
        })

    }catch{
        res.status(500).json({
            message:'Error deleting the Todo'
        })

    }
}

module.exports={
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}

    