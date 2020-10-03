import { ContentBlock, ContentState } from 'draft-js';

const Link: React.FC<LinkProps> = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a href={url} target='_blank' rel='noopener noreferrer' className='editor--link'>
      {children}
    </a>
  );
};

export const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();

    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

interface LinkProps {
  contentState: ContentState;
  entityKey: string;
}

export default Link;
