const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default:"http://localhost:1000/images/user.png" ,
    },
    role :{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    favourites: [{type: mongoose.Types.ObjectId, 
        ref: 'books'}],
    cart: [{type: mongoose.Types.ObjectId, 
        ref: 'books'}],
    orders: [{type: mongoose.Types.ObjectId, 
        ref: 'order'}],
}, {timestamps: true}
);
module.exports = mongoose.model('user', user);  