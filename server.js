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
  const currentDay = days[day];
  console.log(day);
  // Return Current UTC time (with validation of +/-2)

  const utc_time = date.toISOString();
  const github_file_url = '';
  const github_repo_url = '';
  const status_code = 200;
  // return Current UTC time (with validation of +/-2), Track, The GitHub URL of the file being run,  The GitHub URL of the full source code., A  Status Code of Success
  res.status(200).json({
    slack_name,
    currentDay,
    utc_time,
    track,
    github_file_url,
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
