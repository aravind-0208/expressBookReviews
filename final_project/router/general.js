const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    } else {
        return res.status(404).json({
            message: "Book not found"
        });
    }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = decodeURIComponent(req.params.author);
    const result = {};

    for (let key in books) {
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
            result[key] = books[key];
        }
    }

    return res.status(200).json(result);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = decodeURIComponent(req.params.title);
    const result = {};

    for (let key in books) {
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
            result[key] = books[key];
        }
    }

    return res.status(200).json(result);
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

// Axios base URL
const BASE_URL = "http://localhost:5000";

// 1. Get all books using async/await
public_users.get('/async/books', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});

// 2. Get book by ISBN using Promise
public_users.get('/async/isbn/:isbn', (req, res) => {
    axios.get(`${BASE_URL}/isbn/${encodeURIComponent(req.params.isbn)}`)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(error.response?.status || 500)
               .json({ message: "Error retrieving book by ISBN" });
        });
});

// 3. Get books by author using async/await
public_users.get('/async/author/:author', async (req, res) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/author/${encodeURIComponent(req.params.author)}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500)
           .json({ message: "Error retrieving books by author" });
    }
});


// 4. Get books by title using async/await
public_users.get('/async/title/:title', async (req, res) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/title/${encodeURIComponent(req.params.title)}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500)
           .json({ message: "Error retrieving books by title" });
    }
});