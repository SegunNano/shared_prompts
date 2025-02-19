import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required!']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: [true, 'Username already exist!'],
        match: [/^[a-zA-Z0-9]{8,20}$/, ' Username must be 8-20 alphanumeric characters!']
    },
    image: {
        type: String,

    }
});

const User = models.User || model('User', userSchema);
export default User;