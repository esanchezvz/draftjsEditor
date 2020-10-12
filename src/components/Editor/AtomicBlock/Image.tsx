import React, { memo } from 'react';

const Image = ({ url }: Props) => {
  return <img style={{ width: '100%' }} src={url} alt='' />;
};

interface Props {
  url: string;
  publicId: string;
}

export default memo(Image);
