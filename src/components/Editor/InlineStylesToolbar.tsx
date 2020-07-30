import { useState, useEffect } from 'react';
import { EditorState, getVisibleSelectionRect } from 'draft-js';
import TextField from '@material-ui/core/TextField';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import InsertLinkIcon from '@material-ui/icons/InsertLink';

import ToolbarItem from './ToolbarItem';

const InlineStylesToolbar = ({ editorState, handleInlineToggle }: Props) => {
  const [urlInput, setUrlInput] = useState({ open: false, url: '' });
  const targetRect = getVisibleSelectionRect(window);
  const styles = {
    top: targetRect ? targetRect.top - 45 : 0,
    left: targetRect ? targetRect.left : 0,
    display: targetRect ? 'flex' : 'none',
  };
  const inlineStyles = [
    { icon: <FormatBoldIcon />, style: 'BOLD' },
    { icon: <FormatItalicIcon />, style: 'ITALIC' },
    { icon: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
  ];

  useEffect(() => {
    return () => setUrlInput({ open: false, url: '' });
  }, []);

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    setUrlInput((prev) => ({ ...prev, url }));
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
        <TextField
          variant='outlined'
          size='small'
          autoFocus
          className='editor--url-input'
          type='text'
          value={urlInput.url}
          onChange={handleUrlInputChange}
        />
      )}
    </div>
  );
};

interface Props {
  editorState: EditorState;
  handleInlineToggle: (x: string) => void;
}

export default InlineStylesToolbar;
