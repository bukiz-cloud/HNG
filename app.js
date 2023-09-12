const express = require('express');
const app = express();

// Define a route that handles GET requests with query parameters
app.get('/api', (req, res) => {
  // Extract query parameters
  const slackName = req.query.slack_name;
  const track = req.query.track;

  // Validate query parameters
  if (!slackName || !track) {
    return res.status(400).json({ error: 'Both slack_name and track parameters are required.' });
  }

  // Get the current date in full day format
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getUTCDay()];

  // Get the current UTC time with a +/-2 minute window
  const now = new Date();
  const utcTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();

  // Define the GitHub URLs
  const githubFileURL = 'https://github.com/bukiz-cloud/repo/blob/main/app.js';
  const githubRepoURL = 'https://github.com/bukiz-cloud/HNG';

  // Create the JSON response
  const jsonResponse = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: githubFileURL,
    github_repo_url: githubRepoURL,
    status_code: 200,
  };

  // Send the JSON response
  res.json(jsonResponse);
});

// Start the Express.js server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
