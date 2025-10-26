import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const tagModel = mongoose.model('Tags', tagSchema);

export default tagModel
