import { useState, useEffect, useRef } from 'react';
import { EditorState, getVisibleSelectionRect } from 'draft-js';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useTheme } from '@material-ui/core';

import ToolbarItem from './ToolbarItem';
import { urlRegex, getCurrentEntity } from './utils';

const InlineStylesToolbar = ({
  editorState,
  editorRootRect,
  handleInlineToggle,
  addLink,
  removeLink,
}: Props) => {
  const theme = useTheme();

  const targetRect = getVisibleSelectionRect(window);
  const [snackbarState, setSnackBarAlert] = useState({
    open: false,
    text: '',
    severity: '',
  });
  const targetRectRef = useRef(targetRect);
  const [urlInput, setUrlInput] = useState({ open: false, url: '', valid: true });
  const styles = {
    top: targetRectRef.current ? targetRectRef.current.top - editorRootRect.top + 10 : 0,
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
      setSnackBarAlert({ open: true, text: 'Url inválido', severity: 'error' });
      return;
    } else setUrlInput((prev) => ({ ...prev, valid: true, open: false }));
    addLink(urlInput.url);
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
          <Divider flexItem orientation='vertical' style={{ margin: theme.spacing(1, 0.5) }} />
          <ToolbarItem
            handleClick={() => {
              if (getCurrentEntity(editorState)?.getType() === 'LINK') {
                removeLink();
              } else {
                setUrlInput((prev) => ({ ...prev, open: true }));
              }
            }}
            icon={<InsertLinkIcon />}
            active={getCurrentEntity(editorState)?.getType() === 'LINK'}
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
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={() => setSnackBarAlert((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackBarAlert((prev) => ({ ...prev, open: false }))}
          severity='error'
          variant='filled'
        >
          {snackbarState.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

interface Props {
  editorState: EditorState;
  editorRootRect: any;
  addLink: (x: string) => void;
  removeLink: () => void;
  handleInlineToggle: (x: string) => void;
}

export default InlineStylesToolbar;
