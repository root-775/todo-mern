import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true,
    },
    is_complete: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Todos', todoSchema);