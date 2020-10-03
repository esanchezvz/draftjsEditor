import { ContentState, ContentBlock } from 'draft-js';

import Tweet from './Tweet';
import Youtube from './Youtube';

const AtomicBlock = ({ block, contentState }: Props) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const data = entity.getData();
  const type = entity.getType();

  switch (type) {
    case 'tweet':
      return <Tweet tweetId={data.tweetId} />;
    case 'youtube':
      return <Youtube videoId={data.videoId} />;
    default:
      return null;
  }
};

interface Props {
  contentState: ContentState;
  block: ContentBlock;
  blockProps?: any;
}

export default AtomicBlock;
