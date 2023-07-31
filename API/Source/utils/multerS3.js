import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import multer from "multer";
import { randomUUID } from "crypto";

const s3 = new S3Client();
// export const upload = multer({});

export const uploadS3 = async (fileName, fileBuffer) => {
  let name = randomUUID() + fileName;

  const command = new PutObjectCommand({
    Bucket: "netflix-video",
    Key: name,
    Body: fileBuffer,
  });

  try {
    await s3.send(command);
    const objUrl = new URL(
      `https://netflix-video.s3.ap-south-1.amazonaws.com/${name}`
    );
    return objUrl.href;
  } catch (err) {
    console.error(err);
  }
};
