const express = require('express');
const path = require('path');
const fs = require('fs');

function addFile(req, res) {
  const filePath = path.join(__dirname, 'files', req.body.filename);

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    return res.status(400).json({ error: 'File already exists' });
  }
    // Create the file with the provided content
    fs.writeFile(filePath, req.body.content, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create file' });
    }
    res.status(201).json({ message: 'File created successfully' });
    });
}

// Create an Express router
const router = express.Router();
// Define the route for adding a file
router.post('/addfile', express.json(), addFile);
// Export the router
module.exports = router;
