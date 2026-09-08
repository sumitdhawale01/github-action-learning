fetch('/api/message')
  .then((res) => res.json())
  .then((data) => {
    document.getElementById('message').textContent = data.message;
    document.getElementById('hostname').textContent = `pod: ${data.hostname}`;
  })
  .catch(() => {
    document.getElementById('message').textContent = 'Could not reach the API.';
  });
