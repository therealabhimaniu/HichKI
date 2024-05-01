const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'home.html');
    opn(filePath); // Open home.html in the default browser
    res.send('Opening home.html...');
});

app.get('/booking.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'booking.html'));
});

// Route to handle form submission
app.post('/submit-booking', (req, res) => {
    // Extract data from the request body
    const bookingDetails = {
        firstName: req.body['First Name'],
        lastName: req.body['Last Name'],
        email: req.body['Email'],
        tableType: req.body['Table Type'],
        guestNumber: req.body['Guest Number'],
        placement: req.body['Placement'],
        date: req.body['Date'],
        time: req.body['Time'],
        note: req.body['Note']
    };

    // Log the form data to the console
    console.log('Booking details:');
    console.log(bookingDetails);

    // Save the booking details to a JSON file
    const bookingFilePath = path.join(__dirname, 'bookingDetails.json');
    fs.writeFile(bookingFilePath, JSON.stringify(bookingDetails), (err) => {
        if (err) {
            console.error('Error saving booking details:', err);
            res.status(500).send('Error saving booking details');
            return;
        }
        console.log('Booking details saved to bookingDetails.json');
        res.send('Booking successful!');
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
