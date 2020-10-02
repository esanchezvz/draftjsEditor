import { Component } from 'react';
import { ContentState, ContentBlock } from 'draft-js';
import { Tweet } from 'react-twitter-widgets';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import YoutubeVideo from 'react-youtube';

class AtomicBlock extends Component<Props, {}> {
  private block: ContentBlock;
  private type: string;
  private contentState: ContentState;
  private entity: any; // TODO: get correct type = Draft.Model.Entity.DraftEntityInstance
  private data: any;

  constructor(props: Props) {
    super(props);
    this.block = this.props.block;
    this.contentState = this.props.contentState;
    this.entity = this.contentState.getEntity(this.block.getEntityAt(0));
    this.data = this.entity.getData();
    this.type = this.entity.getType();
  }

  render() {
    switch (this.type) {
      case 'tweet':
        return <EmbeddedTweet tweetId={this.data.tweetId} />;
      case 'youtube':
        return <EmbeddedYoutubeVideo videoId={this.data.videoId} />;
      default:
        return null;
    }
  }
}

const EmbeddedTweet = ({ tweetId }: { tweetId: string }) => {
  // TODO -> Update theme dynamically

  return (
    <Tweet
      // ref={tweetRef}
      options={{ align: 'center', theme: 'light' }}
      tweetId={tweetId}
      renderError={(_e) => (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          Error al cargar el tweet. <strong>Revisa que el url sea correcto.</strong>
        </Alert>
      )}
    />
  );
};

const EmbeddedYoutubeVideo = ({ videoId }: { videoId: string }) => {
  const options = {
    width: '100%',
  };
  return <YoutubeVideo videoId={videoId} opts={options} />;
};

interface Props {
  contentState: ContentState;
  block: ContentBlock;
  blockProps: any;
}

export default AtomicBlock;
