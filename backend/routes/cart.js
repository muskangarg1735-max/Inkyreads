const  router = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require('./userToken');

//put book to card
router.put("/addbooktocart", authenticateToken, async (req, res) => {
    try{
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid); 
        if(isBookInCart)
        {
            return res.json({ 
                status: "Success",
                message: "Book is already in cart" });
        }
        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid },
        });
        return res.json({ 
            status: "Success",
            message: "Book added to cart successfully" });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "internal server error in add book to cart" }); 
    }
});
//delete book from cart
router.put("/deletebookfromcart/:bookid", authenticateToken, async (req, res) => {
    try{
        const { bookid} = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid },
        });
        return res.json({
            status: "Success",
            "message":"Book removed from cart successfully" 
        });          
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error in delete book from cart" });
    }
});
//get all cart books of a user
router.get("/getcartbooks", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers; 
        const userData = await User.findById(id).populate("cart");//give whle data not just obj id of fav books
        const cartBooks = userData.cart;
        return res.json({
            statuS:"Success",
        data: cartBooks,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error in get cart books" });
    }
}); 
module.exports= router;    
