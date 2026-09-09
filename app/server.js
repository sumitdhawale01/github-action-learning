// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Serve static frontend files from /public
// app.use(express.static(path.join(__dirname, 'public')));

// // Simple API endpoint the frontend calls
// app.get('/api/message', (req, res) => {
//   res.json({
//     message: 'Hello from your EKS-deployed app!',
//     hostname: require('os').hostname(), // useful to see load-balancing across pods
//     timestamp: new Date().toISOString(),
//   });
// });

// // Health check endpoint — used by Kubernetes readiness/liveness probes
// app.get('/healthz', (req, res) => {
//   res.status(200).send('ok');
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// module.exports = app;


const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Simple API endpoint the frontend calls
app.get('/api/message', (req, res) => {
  res.json({
    message: 'Hello from your EKS-deployed app',
    hostname: require('os').hostname(), // useful to see load-balancing across pods
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint — used by Kubernetes readiness/liveness probes
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// Only start listening when this file is run directly (e.g. `node server.js`
// or in Docker). When Jest requires this file for tests, it just gets `app`
// without a live server — which lets the test process exit cleanly.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;