import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const User = mongoose.model('Users', UserSchema);

export default User;
