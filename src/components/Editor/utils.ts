import { ContentState, EditorState, ContentBlock } from 'draft-js';

export const urlRegex = new RegExp(
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
);

export const getSelectedBlocks = (
  contentState: ContentState,
  anchorKey: string,
  focusKey: string,
) => {
  const isSameBlock = anchorKey === focusKey;
  const startingBlock = contentState.getBlockForKey(anchorKey);
  const selectedBlocks = [startingBlock];

  if (!isSameBlock) {
    let blockKey = anchorKey;
    while (blockKey !== focusKey) {
      const nextBlock = contentState.getBlockAfter(blockKey);
      selectedBlocks.push(nextBlock);
      blockKey = nextBlock.getKey();
    }
  }
  return selectedBlocks;
};

export const handleTextSelection = (editorState: EditorState) => {
  const selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  const currentContentBlock = currentContent.getBlockForKey(anchorKey);
  const start = selectionState.getStartOffset();
  const end = selectionState.getEndOffset();
  const selectedText = currentContentBlock.getText().slice(start, end);

  return selectedText ? true : false;
};

export const getCurrentEntityKey = (editorState: EditorState) => {
  const selection = editorState.getSelection();
  const anchorKey = selection.getAnchorKey();
  const contentState = editorState.getCurrentContent();
  const anchorBlock = contentState.getBlockForKey(anchorKey);
  const offset = selection.getAnchorOffset();
  const index = selection.getIsBackward() ? offset - 1 : offset;
  return anchorBlock.getEntityAt(index);
};

export const linkStrategy = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
) => {
  const matchesEntityType = (type: string) => type === 'LINK';

  if (!contentState) return;
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && matchesEntityType(contentState.getEntity(entityKey).getType());
  }, callback);
};
