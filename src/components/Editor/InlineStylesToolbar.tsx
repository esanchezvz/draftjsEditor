import { useState, useEffect, useRef } from 'react';
import { EditorState, getVisibleSelectionRect, RichUtils } from 'draft-js';
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
import { useEditor } from '../../editor.context';
import { urlRegex, getCurrentEntity } from './utils';

const InlineStylesToolbar = ({ editorRoot }: Props) => {
  if (!editorRoot) return null;

  const { editorState, setEditorState } = useEditor();
  const theme = useTheme();

  const editorRootRect = editorRoot.getBoundingClientRect();
  const parentWindow = editorRoot.ownerDocument && editorRoot.ownerDocument.defaultView;
  const targetRect = getVisibleSelectionRect(parentWindow);
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const targetRectRef = useRef(targetRect);
  const [urlInput, setUrlInput] = useState({ open: false, url: '', valid: true });
  const styles = {
    top: targetRectRef.current ? targetRectRef.current.top - editorRootRect.top + 10 : 0,
    left: targetRectRef.current
      ? editorRoot.offsetLeft +
        (targetRectRef.current.left - editorRootRect.left) +
        targetRectRef.current.width / 2
      : 0,
    padding: theme.spacing(0.5),
    display: targetRectRef.current ? 'flex' : 'none',
  };
  const inlineStyles = [
    { icon: <FormatBoldIcon />, style: 'BOLD' },
    { icon: <FormatItalicIcon />, style: 'ITALIC' },
    { icon: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
  ];

  const _toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    setUrlInput((prev) => ({ ...prev, url }));
  };

  const addLink = (url: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
  };

  const removeLink = () => {
    const selection = editorState.getSelection();
    setEditorState(RichUtils.toggleLink(editorState, selection, null));
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!urlRegex.test(urlInput.url)) {
      setUrlInput((prev) => ({ ...prev, valid: false }));
      setSnackbar({
        open: true,
        text: '<b>Url inválido</b>  —  Asegúrate de que empiece con http:// o https://',
        severity: 'error',
      });
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
                handleClick={() => _toggleInlineStyle(item.style)}
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
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity='error'
          variant='filled'
        >
          <div dangerouslySetInnerHTML={{ __html: snackbar.text }}></div>
        </Alert>
      </Snackbar>
    </div>
  );
};

interface Props {
  editorRoot: HTMLDivElement | null;
}

export default InlineStylesToolbar;
