import { AtomicBlockUtils, ContentState, EditorState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import { Theme } from '@material-ui/core';

export const urlRegex = new RegExp(
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
);

export const twitterRegex = new RegExp(/^https:\/\/twitter.com\/.+/g);
export const youtubeRegex = new RegExp(/^https:\/\/www.youtube.com\/.+/g);

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

export const getCurrentEntity = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const entityKey = getCurrentEntityKey(editorState);

  if (entityKey) {
    const entity = contentState.getEntity(entityKey);
    return entity;
  }

  return null;
};

export const getEntities = (editorState: EditorState, entityType: string | null = null) => {
  const content = editorState.getCurrentContent();
  const entities: any = [];
  content.getBlocksAsArray().forEach((block) => {
    let selectedEntity: any = null;
    block.findEntityRanges(
      (character) => {
        if (character.getEntity() !== null) {
          const entity = content.getEntity(character.getEntity());
          if (!entityType || (entityType && entity.getType() === entityType)) {
            selectedEntity = {
              entityKey: character.getEntity(),
              blockKey: block.getKey(),
              entity: content.getEntity(character.getEntity()),
            };
            return true;
          }
        }
        return false;
      },
      (start, end) => {
        entities.push({ ...selectedEntity, start, end });
      },
    );
  });
  return entities;
};

export const insertAtomicBlock = (
  type: 'image' | 'loader' | 'tweet' | 'youtube',
  data: any,
  editorState: EditorState,
  setEditorState: Dispatch<SetStateAction<EditorState>>,
  _contentState?: ContentState,
) => {
  const contentState = _contentState || editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', data);

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

  setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, type));
};

export const getInlineToolbarStyles = (
  targetRect: FakeClientRect,
  editorRoot: HTMLDivElement,
  theme: Theme,
) => {
  const editorRootRect = editorRoot.getBoundingClientRect();

  return {
    top: targetRect ? targetRect.top - editorRootRect.top + 10 : 0,
    left: targetRect
      ? editorRoot.offsetLeft + (targetRect.left - editorRootRect.left) + targetRect.width / 2
      : 0,
    padding: theme.spacing(0.5),
    display: targetRect ? 'flex' : 'none',
  };
};

interface FakeClientRect {
  top: number;
  bottom: number;
  width: number;
  height: number;
  left: number;
  right: number;
}

export const inlineStyles = [
  { icon: <FormatBoldIcon />, style: 'BOLD' },
  { icon: <FormatItalicIcon />, style: 'ITALIC' },
  { icon: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
];
