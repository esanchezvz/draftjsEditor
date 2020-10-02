import YoutubeVideo from 'react-youtube';

const EmbeddedYoutubeVideo = ({ videoId }: { videoId: string }) => {
  const options = {
    width: '100%',
  };
  return <YoutubeVideo videoId={videoId} opts={options} />;
};

export default EmbeddedYoutubeVideo;
