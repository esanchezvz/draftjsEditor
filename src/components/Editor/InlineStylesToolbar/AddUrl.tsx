import { useState } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Portal from '@material-ui/core/Portal';
import { useTheme } from '@material-ui/core';

import { urlRegex } from '../utils';
import { useEditor } from '../../../editor.context';

const AddUrl = ({ handleInputClose }: Props) => {
  const { editorState, setEditorState } = useEditor();
  const theme = useTheme();

  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [urlInput, setUrlInput] = useState({ url: '', valid: true });

  const addLink = (url: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    handleInputClose();
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    setUrlInput((prev) => ({ ...prev, url }));
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
    } else setUrlInput((prev) => ({ ...prev, valid: true }));
    addLink(urlInput.url);
  };

  return (
    <>
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
      <Portal container={document.body}>
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
      </Portal>
    </>
  );
};

interface Props {
  handleInputClose: () => void;
}

export default AddUrl;
