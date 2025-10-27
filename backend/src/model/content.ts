import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    user_id: {
        type : mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tags',
    }],
    public: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const contentModel = mongoose.model('Contents', contentSchema)

export default contentModel;
