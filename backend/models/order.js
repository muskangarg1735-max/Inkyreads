const mongoose = require('mongoose');
const order = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: 'books',
        required: true
    },
    //only admin chan change the status of order
    status: {
        type: String,
        default: 'Order Placed',
        enum:["Order Placed", "Out for delivery" ," Delivered" ," Cancelled"]
    },
    paymentMode: {
  type: String,
  enum: ['COD', 'Online'],
  required: true,
  default: "COD"
},
},
{timestamps: true}
); //kis user ne order kiya h 
module.exports = mongoose.model('order', order);