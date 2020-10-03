import { useState, useEffect, useRef } from 'react';
import { getVisibleSelectionRect, RichUtils } from 'draft-js';
import Divider from '@material-ui/core/Divider';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import { useTheme } from '@material-ui/core';

import ToolbarItem from '../ToolbarItem';
import { getCurrentEntity, inlineStyles, getInlineToolbarStyles } from '../utils';
import { useEditor } from '../../../editor.context';
import AddUrl from './AddUrl';

const InlineStylesToolbar = ({ editorRoot, focusEditor }: Props) => {
  if (!editorRoot) return null;

  const { editorState, setEditorState } = useEditor();
  const theme = useTheme();

  const parentWindow = editorRoot.ownerDocument && editorRoot.ownerDocument.defaultView;
  const targetRect = getVisibleSelectionRect(parentWindow);
  const targetRectRef = useRef(targetRect);
  const [urlOpen, setUrlOpen] = useState(false);
  const styles = getInlineToolbarStyles(targetRectRef.current, editorRoot, theme);

  const _toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleLink = () => {
    if (getCurrentEntity(editorState)?.getType() === 'LINK') {
      const selection = editorState.getSelection();
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    } else {
      setUrlOpen(true);
    }
  };

  useEffect(() => {
    return () => setUrlOpen(false);
  }, []);

  useEffect(() => {
    if (!targetRect && urlOpen) {
      return;
    } else {
      targetRectRef.current = targetRect;
    }
  }, [targetRect]);

  return (
    <div style={styles} className='editor--inline-toolbar'>
      {!urlOpen && (
        <>
          {inlineStyles.map((item, i) => {
            const currentStyle = editorState.getCurrentInlineStyle();

            return (
              <ToolbarItem
                key={`${item.icon}-${i}`}
                handleClick={() => _toggleInlineStyle(item.style)}
                icon={item.icon}
                active={currentStyle.has(item.style)}
              />
            );
          })}
          <Divider flexItem orientation='vertical' style={{ margin: theme.spacing(1, 0.5) }} />
          <ToolbarItem
            handleClick={toggleLink}
            icon={<InsertLinkIcon />}
            active={getCurrentEntity(editorState)?.getType() === 'LINK'}
          />
        </>
      )}
      {urlOpen && (
        <AddUrl
          handleInputClose={() => {
            setUrlOpen(false);
            focusEditor();
          }}
        />
      )}
    </div>
  );
};

interface Props {
  editorRoot: HTMLDivElement | null;
  focusEditor: () => void;
}

export default InlineStylesToolbar;
