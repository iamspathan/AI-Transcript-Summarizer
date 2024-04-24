const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');
const open = require('open');
const app = express();
const port = 3000;

app.use(cors());
app.use(fileUpload());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/summarize', (req, res) => {
    console.log("summarixe called", req.files.file);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // Assuming the file is attached to the request under the key 'file'
    const file = req.files.file;

    // Prepare the file to be sent using form-data
    const formData = new FormData();
    formData.append('file', file.data, file.name);

    // Set up the request headers, including the dynamic headers from form-data
    const requestHeaders = {
        ...formData.getHeaders(),
        'apy-token': 'ADD-YOUR-SECRET-APY-TOKE-HERE'
    };

    // Call the AI Summarize API
    axios.post('https://api.apyhub.com/ai/summarize-documents/file', formData, { headers: requestHeaders })
        .then(apiResponse => {
            // Assuming the API returns JSON with a summary field
            console.log(apiResponse.data.data.summary);
            res.send({ summary: apiResponse.data.data.summary });
        })
        .catch(error => {
            console.error('Error calling the AI Summarize API:', error);
            res.status(500).send('Failed to summarize the document.');
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // Open the index.html file in the default browser
    open(`http://localhost:${port}`);
});
