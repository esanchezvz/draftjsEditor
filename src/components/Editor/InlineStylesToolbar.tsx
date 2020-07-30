import { useState, useEffect, useRef } from 'react';
import { EditorState, getVisibleSelectionRect } from 'draft-js';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import { useTheme } from '@material-ui/core';

import ToolbarItem from './ToolbarItem';
import { urlRegex } from './utils';

const InlineStylesToolbar = ({ editorState, handleInlineToggle, focusEditor }: Props) => {
  const theme = useTheme();

  const targetRect = getVisibleSelectionRect(window);
  const targetRectRef = useRef(targetRect);
  const [urlInput, setUrlInput] = useState({ open: false, url: '', valid: true });
  const styles = {
    top: targetRectRef.current ? targetRectRef.current.top - 45 : 0,
    left: targetRectRef.current ? targetRectRef.current.left : 0,
    padding: theme.spacing(0.5),
    display: targetRectRef.current ? 'flex' : 'none',
  };
  const inlineStyles = [
    { icon: <FormatBoldIcon />, style: 'BOLD' },
    { icon: <FormatItalicIcon />, style: 'ITALIC' },
    { icon: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
  ];

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    setUrlInput((prev) => ({ ...prev, url }));
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!urlRegex.test(urlInput.url)) {
      setUrlInput((prev) => ({ ...prev, valid: false }));
      // alert('Url inválido');
      return;
    } else setUrlInput((prev) => ({ ...prev, valid: true, open: false }));
    focusEditor();
    console.log(urlInput.url);
  };

  useEffect(() => {
    return () => setUrlInput({ open: false, url: '', valid: true });
  }, []);

  useEffect(() => {
    if (!targetRect && urlInput.open) {
      return;
    } else {
      targetRectRef.current = targetRect;
    }
    console.log(targetRect, urlInput.open, targetRectRef.current);
  }, [targetRect]);

  return (
    <div style={styles} className='editor--inline-toolbar'>
      {!urlInput.open && (
        <>
          {inlineStyles.map((item, i) => {
            const currentStyle = editorState.getCurrentInlineStyle();

            return (
              <ToolbarItem
                key={`${item.icon}-${i}`}
                handleClick={() => handleInlineToggle(item.style)}
                icon={item.icon}
                active={currentStyle.has(item.style)}
              />
            );
          })}
          <Divider flexItem orientation='vertical' style={{ margin: '8px 4px' }} />
          <ToolbarItem
            handleClick={() => setUrlInput((prev) => ({ ...prev, open: true }))}
            icon={<InsertLinkIcon />}
            active={false}
          />
        </>
      )}
      {urlInput.open && (
        <form style={{ display: 'flex', alignItems: 'center' }} onSubmit={handleUrlSubmit}>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <input
              style={{ ...theme.typography.body2 }}
              autoFocus
              className='editor--input'
              type='text'
              value={urlInput.url}
              onChange={handleUrlInputChange}
            />
          </div>

          <Button
            style={{ padding: '2px 5px', minWidth: 0 }}
            color='primary'
            type='submit'
            variant='contained'
          >
            Ok
          </Button>
        </form>
      )}
    </div>
  );
};

interface Props {
  editorState: EditorState;
  focusEditor: () => void;
  handleInlineToggle: (x: string) => void;
}

export default InlineStylesToolbar;
