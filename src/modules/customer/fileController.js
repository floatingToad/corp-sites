const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const listFiles = async (req, res) => {
    const { folder } = req.query;

    if (!folder) {
        return res.status(400).json({ message: 'Folder parameter is required' });
    }

    const prefix = folder.endsWith('/') ? folder : `${folder}/`;

    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.S3_BUCKET_NAME,
            Prefix: prefix,
        });

        const data = await s3Client.send(command);

        const files = (data.Contents || [])
            .filter(item => item.Key !== prefix)
            .map(item => ({
                key: item.Key,
                name: item.Key.replace(prefix, ''),
                lastModified: item.LastModified,
                size: item.Size,
            }));

        res.json({ files });
    } catch (error) {
        console.error('S3 List Error:', error);
        res.status(500).json({ message: 'Error listing files' });
    }
};

const getFileUrl = async (req, res) => {
    const { key } = req.query;

    if (!key) {
        return res.status(400).json({ message: 'File key is required' });
    }

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 900 });

        res.json({ url });
    } catch (error) {
        console.error('S3 Presign Error:', error);
        res.status(500).json({ message: 'Error generating URL' });
    }
};

module.exports = { listFiles, getFileUrl };
