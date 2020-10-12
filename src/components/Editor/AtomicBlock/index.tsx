import { memo } from 'react';
import { ContentState, ContentBlock } from 'draft-js';

import Tweet from './Tweet';
import Youtube from './Youtube';
import Image from './Image';
import Loading from './Loading';
import RemoveMediaContainer from './RemoveMediaContainer';

const AtomicBlock = ({ block, contentState, blockProps }: Props) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const data = entity.getData();
  const type = entity.getType();

  // console.log(blockProps);

  const _handleDelete = () => {
    const { onClickDelete, key } = blockProps!;
    onClickDelete(key, block.getLength());
  };

  switch (type) {
    case 'tweet':
      return <Tweet tweetId={data.tweetId} />;
    case 'youtube':
      return <Youtube videoId={data.videoId} />;
    case 'image':
      return (
        <RemoveMediaContainer handleClick={_handleDelete}>
          <Image {...data} />
        </RemoveMediaContainer>
      );
    case 'loader':
      return <Loading loading />;
    default:
      return null;
  }
};

interface Props {
  contentState: ContentState;
  block: ContentBlock;
  blockProps?: {
    isFocused: boolean;
    key: string;
    onClickDelete: (key: string, length: number) => {};
    block: any;
  };
}

export default memo(AtomicBlock);
