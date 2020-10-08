import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files } from 'formidable';
import { presets, uploadFile } from '../../utils/cloudinary.utils';

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // parse form with a Promise wrapper
  const data = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const uploadedFile = await uploadFile(data?.files?.image.path, presets.draftjs);

  res.status(200).json({ success: true, data: uploadedFile });
};
