import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import sharp from 'sharp';
import fs from 'fs';

import { presets, uploadFile } from '../../utils/cloudinary.utils';

export const config = {
  api: {
    bodyParser: false,
  },
};

// No validation or error handling since its just for testing editor
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tmpPath = await new Promise<string>((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, async (err, _fields, files) => {
        if (err) {
          if (fs.existsSync(files.image.path)) fs.unlinkSync(files.image.path);
          return reject(err);
        }

        const newPath = `./uploads/${Date.now()}_${files.image.name}`;

        sharp.cache(false);
        await sharp(files.image.path)
          .rotate()
          .resize()
          .jpeg({ quality: 50, progressive: true })
          .toFile(newPath);

        if (fs.existsSync(files.image.path)) fs.unlinkSync(files.image.path);
        resolve(newPath);
      });
    });
    const uploadedFile = await uploadFile(tmpPath, presets.draftjs);

    // Delete tmpFile from server
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);

    res.status(200).json({ success: true, data: uploadedFile });
  } catch (error) {
    console.log(error);
    res.status(200).json({ success: false, error });
  }
};
