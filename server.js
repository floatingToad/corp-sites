const express = require('express');
const cors = require('cors');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const authRoutes = require('./src/modules/auth/authRoutes');
const fileRoutes = require('./src/modules/customer/fileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
