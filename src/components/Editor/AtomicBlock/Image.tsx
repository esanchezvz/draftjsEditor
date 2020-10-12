import React, { memo } from 'react';

const Image = ({ url }: Props) => {
  return (
    <div>
      <img style={{ width: '100%' }} src={url} alt='' />
    </div>
  );
};

interface Props {
  url: string;
  publicId: string;
}

export default memo(Image);
