import { useState, useEffect } from 'react';
import { EditorState, getVisibleSelectionRect } from 'draft-js';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import { useTheme } from '@material-ui/core';

import ToolbarItem from './ToolbarItem';
import { urlRegex } from './utils';

const InlineStylesToolbar = ({ editorState, handleInlineToggle }: Props) => {
  const theme = useTheme();
  const [urlInput, setUrlInput] = useState({ open: false, url: '', valid: true });
  const targetRect = getVisibleSelectionRect(window);
  const styles = {
    top: targetRect ? targetRect.top - 45 : 0,
    left: targetRect ? targetRect.left : 0,
    padding: theme.spacing(0.5),
    // display: targetRect ? 'flex' : 'none',
  };
  const inlineStyles = [
    { icon: <FormatBoldIcon />, style: 'BOLD' },
    { icon: <FormatItalicIcon />, style: 'ITALIC' },
    { icon: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
  ];

  useEffect(() => {
    return () => setUrlInput({ open: false, url: '', valid: true });
  }, []);

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
    } else setUrlInput((prev) => ({ ...prev, valid: true }));
    console.log(urlInput.url);
  };

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
  handleInlineToggle: (x: string) => void;
}

export default InlineStylesToolbar;
