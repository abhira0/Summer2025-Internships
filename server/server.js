require('dotenv').config();
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

const SEVER_PORT = process.env.SEVER_PORT;
app.listen(SEVER_PORT, () => {
    console.log(`Server running on port ${SEVER_PORT}`);
});
