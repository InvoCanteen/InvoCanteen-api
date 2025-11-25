import { v2 as cloudinary } from "cloudinary";

export async function uploadToCloudinary(
  file: Express.Multer.File
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "invocanteen" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result!.secure_url);
      }
    );

    stream.end(file.buffer);
  });
}

export async function deleteFromCloudinary(url: string): Promise<void> {
  const parts = url.split("/");
  const publicIdWithExtension = parts.slice(-2).join("/");
  const public_id = publicIdWithExtension.substring(
    0,
    publicIdWithExtension.lastIndexOf(".")
  );

  if (!public_id) return;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (err, result) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
