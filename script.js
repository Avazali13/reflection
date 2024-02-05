
const table = document.getElementById('tableBody');
const dropArea = document.getElementById('dropArea');

function handleDragOver(event) {
    event.preventDefault();
    dropArea.textContent = 'Drop the file here';
}

function handleDrop(event) {
    event.preventDefault();
    dropArea.textContent = 'File dropped!';

    const files = event.dataTransfer.files;
console.log(files[0]);
    if (files.length > 0) {
        const file = files[0];
let format=file.name.split('.');

        if (format[1] === 'txt') {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (e) {
                const content = e.target.result;
 
                parseAndDisplayData(content);
            };

 
        } else {
            dropArea.textContent = 'Invalid file format. Please drop a "txt" file.';
        }
    }
}
let jsonData=[]
function parseAndDisplayData(content) {
    // Split the content into rows
    const rows = content.trim().split('\n');
    // let jsonData=[]

    // Clear existing table rows
    table.innerHTML = '';

    rows.forEach(row => {
        // Split each row into columns
        const [firstName, lastName, email, phone] = row.split(',');

        // Add a row to the table
        const newRow = table.innerHTML += `
            <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${phone}</td>
            </tr>
        `;
        jsonData.push({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        })
    });

    return jsonData


}



function saveToServer(jsonData) {

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}




// saveToServer(jsonData)