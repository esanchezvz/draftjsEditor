const cloudinary = require('cloudinary').v2;
import fs from 'fs';

const { CLOUDINARY_CLOUD, CLOUDINARY_KEY, CLOUDINARY_SECRET, CLOUDINARY_PRESET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export const presets = {
  draftjs: CLOUDINARY_PRESET as string,
};

// This should be done through an API, not directly on the frontends
export const uploadFile = (
  filePath: string,
  uploadPreset: string,
): Promise<ICloudinaryFileUploaded> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.unsigned_upload(
      filePath,
      uploadPreset,
      {},
      (err: any, result: ICloudinaryFileUploaded) => {
        if (err) {
          // console.log(err);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          reject({ ...err });
        }

        resolve(result);
      },
    );
  });
};

export interface ICloudinaryFileUploaded {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
}
