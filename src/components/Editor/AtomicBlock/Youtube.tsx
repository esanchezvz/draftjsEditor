import YoutubeVideo from 'react-youtube';

const EmbeddedYoutubeVideo = ({ videoId }: { videoId: string }) => {
  const options = {
    width: '100%',
  };
  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <YoutubeVideo videoId={videoId} opts={options} />
    </div>
  );
};

export default EmbeddedYoutubeVideo;
