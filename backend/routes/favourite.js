const  router = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require('./userToken');

//add book to favourite
router.put("/addbooktofavourite", authenticateToken, async (req, res) => {
    try{
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavoruite = userData.favourites.includes(bookid); 
        if(isBookFavoruite)
        {
            return res.status(200).json({ message: "Book is already in favourite" });
        }
        await User.findByIdAndUpdate(id, {
            $push: { favourites: bookid },
        });
        return res.status(200).json({ message: "Book added to favourites successfully" });
    }
    catch(error){
        res.status(500).json({ message: "internal server error in add book to favourite" }); 
    }
});
//delete book from favourite
router.put("/deletebookfromfavourite", authenticateToken, async (req, res) => {
    try{
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavoruite = userData.favourites.includes(bookid); 
        if(isBookFavoruite)
        {
            await User.findByIdAndUpdate(id, {
                $pull: { favourites: bookid },
            });
        }
       
        return res.status(200).json({ message: "Book removed from favourites successfully" });
    }
    catch(error){
        res.status(500).json({ message: "internal server error in add book to favourite" }); 
    }
});
//get all favourite books of a user
router.get("/getfavouritebooks", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers; 
        const userData = await User.findById(id).populate("favourites");//give whle data not just obj id of fav books
        const favouriteBooks = userData.favourites;
        return res.json({
            statuS:"Success",
        data: favouriteBooks,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error in get favourite books" });
    }
});
module.exports = router;