const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userToken");

// add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id }= req.headers;
       const user =  await User.findById(id);
       if(user.role !== "admin"){
        return res.status(400).json({ message: "You are not authorized to add book" });
       }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,   
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        res.status(500).json({ message: "internal server error in add book" }); 
     }
});
     // update book
     router.put("/updatebook", authenticateToken, async (req, res) => {
        try {
            const { bookid }= req.headers;
            await Book.findByIdAndUpdate(bookid, {
                url: req.body.url,
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                desc: req.body.desc,
                language: req.body.language,
            });
            return res.status(200).json({ message: "Book updated successfully" }); 
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "internal server error in update book" });
        }
    }
);
// delete book --admin
router.delete("/deletebook", authenticateToken, async (req, res) => {
    try {
        const { bookid }= req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error in delete book" });
    }
});

//public apis
// get all books
router.get("/getallbooks", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status:"Success",
            data: books,
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error in get all books" });
    }
});
//get recently added books
router.get("/getrecentbooks", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status:"Success",
            data: books,
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error in get recent books" });
    }
});
//get book by id
router.get("/getbookbyid/:id", async (req, res) => {
    try {
        const { id }= req.params;
        const book = await Book.findById(id);
        return res.json({
            status:"Success",
            data: book,
        });
    }
    catch (error){
        console.log(error);
        res.status(500).json({ message: "internal server error in get book by id" }); 
    }
});
module.exports = router;