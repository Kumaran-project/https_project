document.getElementById('complaintForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const description = document.getElementById('description').value;
  const statusMsg = document.getElementById('statusMsg');
 

  const data = {
    name,
    email,
    subject,
    description
  };

  try {
    const response = await fetch('/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      statusMsg.style.color = 'green';
      statusMsg.textContent = 'Complaint submitted successfully!';
      document.getElementById('complaintForm').reset();
    } else {
      const error = await response.json();
      statusMsg.style.color = 'red';
      statusMsg.textContent = error.message || 'Submission failed.';
    }
  } catch (err) {
    console.error(err);
    statusMsg.style.color = 'red';
    statusMsg.textContent = 'Something went wrong!';
  }
});
