const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // use your MySQL username
    password: 'Sowjanyabhat#345', // use your MySQL password
    database: 'bookingdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/servicesj.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'servicesj.html'));
});

app.get('/blog.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/Book.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Book.html'));
});

// Handle form submission
app.post('/process_booking', (req, res) => {
    const { name, email, pet, service, date, message } = req.body;
    const sql = 'INSERT INTO bookings (name, email, pet, service, date, message) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, email, pet, service, date, message];

    db.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log('Booking data inserted', result);
        res.send('<p>Thank you for booking a session with us! We will get back to you shortly.</p>');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
