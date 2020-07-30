import { ContentState, EditorState } from 'draft-js';

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
