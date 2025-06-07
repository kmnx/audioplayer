const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const PLAYLIST_DIR = path.join(__dirname, 'playlist');

// Serve static files (HTML, CSS, JS, audio)
app.use(express.static(__dirname));

// API endpoint to get playlist files
app.get('/api/playlist', (req, res) => {
  fs.readdir(PLAYLIST_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: 'Could not read playlist directory' });
    const allowed = ['.mp3', '.webm', '.mp4'];
    const media = files.filter(f => allowed.includes(path.extname(f).toLowerCase()));
    res.json(media);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});