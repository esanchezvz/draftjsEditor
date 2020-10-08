import axios from 'axios';
import { ICloudinaryFileUploaded } from './cloudinary.utils';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  return axios.post<{ succes: boolean; data: ICloudinaryFileUploaded }>(
    '/api/upload',
    formData,
    config,
  );
};
