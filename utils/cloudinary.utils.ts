const cloudinary = require('cloudinary').v2;
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const presets = {
  draftjs: process.env.CLOUDINARY_PRESET!,
};

export const uploadFile = (
  tempFilePath: string,
  uploadPreset: string,
): Promise<ICloudinaryFileUploaded> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.unsigned_upload(
      tempFilePath,
      uploadPreset,
      {},
      (err: any, result: ICloudinaryFileUploaded) => {
        if (err) {
          console.log(err);
          if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
          reject({ ...err });
        }

        resolve(result);
      },
    );
  });
};

export const deleteResources = (publicIds: string[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    cloudinary.api.delete_resources(publicIds, function (err: any) {
      if (err) {
        console.log(err);
        reject({ ...err });
      }

      resolve();
    });
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
