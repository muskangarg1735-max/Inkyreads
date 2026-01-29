const express = require('express');
const path = require("path")
const app = express();
const cors = require ("cors");
require('dotenv').config();
require('./connection/conn');  
const User = require('./routes/userauth');
const Books = require('./routes/book');
const Favourite = require('./routes/favourite');
const Cart1 = require('./routes/cart');
const Order = require('./routes/order');
app.use(cors())
app.use(express.json());
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use('/images',
    express.static(path.join(__dirname, 'images'))
)
//route 
app.use("/api/v1",User);
app.use("/api/v1",Books);
app.use("/api/v1",Favourite);
app.use("/api/v1",Cart1);
app.use("/api/v1",Order);
//creating port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
// module.exports = app;