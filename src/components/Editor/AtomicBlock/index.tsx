import { Component } from 'react';
import { ContentState, ContentBlock } from 'draft-js';

import Tweet from './Tweet';
import Youtube from './Youtube';

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
        return <Tweet tweetId={this.data.tweetId} />;
      case 'youtube':
        return <Youtube videoId={this.data.videoId} />;
      default:
        return null;
    }
  }
}

interface Props {
  contentState: ContentState;
  block: ContentBlock;
  blockProps: any;
}

export default AtomicBlock;
