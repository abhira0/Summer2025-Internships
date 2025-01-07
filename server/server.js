const express = require('express');
const path = require('path');
const cors = require('cors');
const applicationsRouter = require('./api/applications');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../docs')));

// API routes
app.use('/api/applications', applicationsRouter);

const PORT = process.env.PORT || 32768;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
