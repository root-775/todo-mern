import todoModel from '../models/todoModel.js'

export const addTodoController = async (req, res) => {
    try {
        const { input } = req.body;
        if (!input) {
            return res.status(200).send({
                status: true,
                message: 'Todo is required'
            })
        }
        const todo = await new todoModel({ input: input, is_complete: false }).save()
        res.status(200).send({
            status: true,
            message: 'Todo is added successfully',
            todo: todo
        })
    } catch (error) {
        res.status(500).send({
            status: true,
            message: "Error while Adding new TODO",
            error: error
        })
    }
}


export const completeTodoController = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todoModel.findByIdAndUpdate(id, { is_complete: true })//({ input: input, is_complete: false }).save()

        res.status(200).send({
            status: true,
            message: 'Todo is completed successfully',
            todo: todo
        })
    } catch (error) {
        res.status(500).send({
            status: true,
            message: "Error while complete TODO",
            error: error
        })
    }
}


export const getAllTodosController = async (req, res) => {
    try {
        const todos = await todoModel.find({}).sort({ createdAt: -1 })
        res.status(200).send({
            status: true,
            message: 'Todo getting successfully',
            todos: todos
        })
    } catch (error) {
        res.status(500).send({
            status: true,
            message: "Error while complete TODO",
            error: error
        })
    }
}


export const trashTodosController = async (req, res) => {
    try {
        const { id } = req.params;
        await todoModel.findByIdAndDelete(id)
        res.status(200).send({
            status: true,
            message: 'Trash Todo successfully'
        })
    } catch (error) {
        res.status(500).send({
            status: true,
            message: "Error while trash TODO",
            error: error
        })
    }
}