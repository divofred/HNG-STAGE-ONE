const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('HNG Stage one task');
});

app.get('/api', (req, res) => {
  const { slack_name, track } = req.query;
  // Return the current day of the week
  const date = new Date();
  const day = date.getDay();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const current_day = days[day];
  console.log(day);
  // Return Current UTC time (with validation of +/-2)

  const utc_time = date.toString().replace(/\.\d+Z/, 'Z');
  const github_file_url =
    'https://github.com/divofred/HNG-STAGE-ONE/repo/blog/main/server.js';
  const github_repo_url = 'https://github.com/divofred/HNG-STAGE-ONE';
  const status_code = 200;
  // return Current UTC time (with validation of +/-2), Track, The GitHub URL of the file being run,  The GitHub URL of the full source code., A  Status Code of Success
  res.status(200).json({
    slack_name,
    current_day,
    utc_time,
    track,
    github_file_url,
    github_repo_url,
    status_code
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
