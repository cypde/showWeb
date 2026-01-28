import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_URL,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_SECRET_KEY,
  },
});

const bucketName = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET;

export const getObjectUrl = (key) => {
  return `${process.env.NEXT_PUBLIC_CLOUDFLARE_R2_URL}/${bucketName}/${key}`;
};

export const uploadObject = async (key, body, contentType) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  try {
    const response = await s3Client.send(command);
    return response;
  } catch (error) {
    console.error('Error uploading object:', error);
    throw error;
  }
};

export const getObject = async (key) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  try {
    const response = await s3Client.send(command);
    return response;
  } catch (error) {
    console.error('Error getting object:', error);
    throw error;
  }
};

export default s3Client;