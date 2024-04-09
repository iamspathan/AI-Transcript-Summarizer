document.addEventListener('DOMContentLoaded', (event) => {
    let dropZone = document.getElementById('drop_zone');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);

    let fileInput = document.getElementById('file_input');
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (event) => {
        handleFiles(event.target.files);
    });

    document.getElementById('summarize_button').addEventListener('click', function() {
        const fileInput = document.getElementById('file_input');
        if (fileInput.files.length === 0) {
            alert('Please provide a file first.');
        } else {
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file', file);

            fetch('/summarize', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Here you can update the UI with the summary data
                // For example, if you have a div with id="summary" to display the summary:
                document.getElementById('summary').textContent = data.summary;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropZone.classList.add('highlight');
    }

    function unhighlight(e) {
        dropZone.classList.remove('highlight');
    }

    function handleDrop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;

        handleFiles(files);
    }

    function handleFiles(files) {
        ([...files]).forEach(uploadFile);
    }

    function uploadFile(file) {
        // Here you would typically upload the file, but for now, we'll just log it
        console.log('File you dragged:', file.name);
        // Assuming you have a function to process the file
        // For example, send it to the server via AJAX
        // uploadToServer(file);
    }
});

// Remember to add the necessary CSS to highlight the drop zone
