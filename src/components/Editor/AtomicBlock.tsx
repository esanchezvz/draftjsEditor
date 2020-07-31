import { Component } from 'react';
import { ContentState, ContentBlock } from 'draft-js';
import { Tweet } from 'react-twitter-widgets';

class AtomicBlock extends Component<Props, {}> {
  private block: ContentBlock;
  private contentState: ContentState;
  private entity: any; // TODO: get correct type = Draft.Model.Entity.DraftEntityInstance
  private data: any;

  constructor(props: Props) {
    super(props);
    this.block = this.props.block;
    this.contentState = this.props.contentState;
    this.entity = this.contentState.getEntity(this.block.getEntityAt(0));
    this.data = this.entity.getData();
  }

  render() {
    switch (this.data.type) {
      case 'tweet':
        return <EmbeddedTweet tweetId={this.data.tweetId} />;
      default:
        return null;
    }
  }
}

const EmbeddedTweet = ({ tweetId }: { tweetId: string }) => {
  return <Tweet options={{ align: 'center' }} tweetId={tweetId} />;
};

interface Props {
  contentState: ContentState;
  block: ContentBlock;
  blockProps: any;
}

export default AtomicBlock;
