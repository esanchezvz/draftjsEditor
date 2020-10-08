import { useState } from 'react';
import YoutubeVideo from 'react-youtube';

import Loading from './Loading';

const EmbeddedYoutubeVideo = ({ videoId }: { videoId: string }) => {
  const [loading, setLoading] = useState(true);

  const options = {
    width: '100%',
  };
  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      {loading && <Loading loading={loading} />}

      <YoutubeVideo onReady={() => setLoading(false)} videoId={videoId} opts={options} />
    </div>
  );
};

export default EmbeddedYoutubeVideo;
